import ShopHeader from '../components/shop-header'
import CategoryFilter from '../components/category-filter'
import {
  getCollectionProducts,
  excludeKidsProducts,
  excludeProductsWithoutImages,
  excludeSafetyProducts,
} from '../../lib/shopify-storefront'

// Sweatshirts removed — moved to /outerwear. Activewear added for the Active tab.
const FETCH_TAGS = ['T-Shirts', 'Longsleeves', 'Tanks & Singlets', 'Activewear']
const TABS = ['T-Shirts', 'Longsleeves', 'Tanks & Singlets', 'Active', "Women's"]

export default async function BasewearPage() {
  const raw = await getCollectionProducts(FETCH_TAGS)
  const products = excludeProductsWithoutImages(excludeSafetyProducts(excludeKidsProducts(raw)))

  const byTag = (tag: string) =>
    products.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))

  const tabGroups = {
    'T-Shirts': byTag('T-Shirts'),
    'Longsleeves': byTag('Longsleeves'),
    'Tanks & Singlets': byTag('Tanks & Singlets'),
    'Active': products.filter(
      (p) =>
        p.tags.some((t) => t.toLowerCase() === 'activewear') ||
        /active/i.test(p.title)
    ),
    "Women's": products.filter((p) => p.title.includes("Wo's")),
  }

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-6 text-gray-400">Base Wear</h1>
        <CategoryFilter all={products} tabGroups={tabGroups} tabs={TABS} />
      </main>
    </div>
  )
}
