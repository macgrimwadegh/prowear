import ShopHeader from '../components/shop-header'
import CategoryFilter from '../components/category-filter'
import {
  getCollectionProducts,
  getSafetyProducts,
  excludeKidsProducts,
  excludeProductsWithoutImages,
} from '../../lib/shopify-storefront'

const FETCH_TAGS = ['Workwear', 'Aprons & Overalls']
const TABS = ['Workwear', 'Aprons & Overalls', "Women's"]

export default async function WorkwearPage() {
  // Fetch workwear-tagged products and safety-titled products in parallel.
  // Safety products appear here regardless of their Shopify tags.
  const [regular, safety] = await Promise.all([
    getCollectionProducts(FETCH_TAGS),
    getSafetyProducts(),
  ])

  // Merge, deduplicating by product id
  const seen = new Set<string>()
  const merged = [...regular, ...safety].filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })

  // Do NOT apply excludeSafetyProducts here — this is where they belong
  const products = excludeProductsWithoutImages(excludeKidsProducts(merged))

  const byTag = (tag: string) =>
    products.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))

  const tabGroups = {
    'Workwear': byTag('Workwear'),
    'Aprons & Overalls': byTag('Aprons & Overalls'),
    "Women's": products.filter((p) => p.title.includes("Wo's")),
  }

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-6 text-gray-400">Work Wear</h1>
        <CategoryFilter all={products} tabGroups={tabGroups} tabs={TABS} />
      </main>
    </div>
  )
}
