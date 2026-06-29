import Link from 'next/link'
import type { ShopifyProduct } from '../../lib/shopify-storefront'

interface ProductGridProps {
  products: ShopifyProduct[]
  emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-xs text-gray-400 tracking-widest uppercase">
        {emptyMessage || 'No products found.'}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => {
        const imageUrl = product.featuredImage?.url || ''
        const price = parseFloat(product.priceRange.minVariantPrice.amount)
        const formattedPrice = `$${price.toFixed(2)} ex GST`

        return (
          <Link key={product.id} href={`/products/${product.handle}`} className="group block">
            <div className="bg-white">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.featuredImage?.altText || product.title}
                  className="aspect-square w-full object-cover bg-gray-50 group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="aspect-square w-full bg-gray-50 group-hover:opacity-90 transition-opacity" />
              )}
              <div className="mt-2">
                <p className="text-xs tracking-widest uppercase">{product.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{formattedPrice}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
