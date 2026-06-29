const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN!
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-01'

const PROWEAR_COLLECTION_ID = 'gid://shopify/Collection/491112628448'

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

export interface ShopifyVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  image: ShopifyImage | null
  price: {
    amount: string
    currencyCode: string
  }
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  tags: string[]
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  featuredImage: ShopifyImage | null
  images: {
    edges: { node: ShopifyImage }[]
  }
  variants: {
    edges: { node: ShopifyVariant }[]
  }
}

const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export async function storefrontQuery<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const url = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

function filterByExactTags(products: ShopifyProduct[], tags: string[]): ShopifyProduct[] {
  const lowerTags = new Set(tags.map((t) => t.toLowerCase()))
  return products.filter((p) =>
    p.tags.some((t) => lowerTags.has(t.toLowerCase()))
  )
}

async function getProductsByTagQuery(tags: string[]): Promise<ShopifyProduct[]> {
  // Use Shopify's native search syntax — no collection access needed
  const tagQuery = tags.map((t) => `tag:"${t}"`).join(' OR ')

  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductsByTags($query: String!) {
      products(first: 100, query: $query) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `

  const data = await storefrontQuery<{
    products: { edges: { node: ShopifyProduct }[] }
  }>(query, { query: tagQuery })

  return data?.products?.edges?.map((e) => e.node) ?? []
}

export async function getCollectionProducts(tags?: string[]): Promise<ShopifyProduct[]> {
  // Strategy 1: collection-scoped query (requires collection published to Storefront API)
  try {
    const query = `
      ${PRODUCT_FRAGMENT}
      query GetCollectionProducts($id: ID!) {
        collection(id: $id) {
          products(first: 250) {
            edges {
              node {
                ...ProductFragment
              }
            }
          }
        }
      }
    `

    const data = await storefrontQuery<{
      collection: { products: { edges: { node: ShopifyProduct }[] } } | null
    }>(query, { id: PROWEAR_COLLECTION_ID })

    if (data?.collection?.products?.edges?.length) {
      const all = data.collection.products.edges.map((e) => e.node)
      return tags?.length ? filterByExactTags(all, tags) : all
    }
  } catch {
    // Collection not accessible — fall through to tag query
  }

  // Strategy 2: native Shopify tag search (works without collection access)
  if (!tags?.length) return []
  return getProductsByTagQuery(tags)
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
  `

  const data = await storefrontQuery<{
    product: ShopifyProduct | null
  }>(query, { handle })

  return data.product
}

export function getProductColors(product: ShopifyProduct): string[] {
  const colors: string[] = []
  const seen = new Set<string>()

  for (const edge of product.variants.edges) {
    const variant = edge.node
    for (const option of variant.selectedOptions) {
      if (option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'colour') {
        const color = option.value
        if (!seen.has(color.toLowerCase())) {
          seen.add(color.toLowerCase())
          colors.push(color)
        }
      }
    }
  }

  return colors
}

export function getColorImage(product: ShopifyProduct, color: string): string {
  const lowerColor = color.toLowerCase()

  for (const edge of product.variants.edges) {
    const variant = edge.node
    const matchesColor = variant.selectedOptions.some(
      (opt) =>
        (opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour') &&
        opt.value.toLowerCase() === lowerColor
    )

    if (matchesColor && variant.image?.url) {
      return variant.image.url
    }
  }

  // Fall back to featured image
  if (product.featuredImage?.url) {
    return product.featuredImage.url
  }

  // Fall back to first image
  const firstImage = product.images.edges[0]?.node
  if (firstImage?.url) return firstImage.url

  return ''
}
