import ShopHeader from '../components/shop-header'
import CategoryFilter from '../components/category-filter'
import {
  getCollectionProducts,
  excludeKidsProducts,
  excludeProductsWithoutImages,
  excludeSafetyProducts,
} from '../../lib/shopify-storefront'

const FETCH_TAGS = ['Jackets', 'Puffers', 'Sweatshirts']
const TABS = ['Jackets', 'Puffers', 'Sweats', "Women's"]

export default async function OuterwearPage() {
  const raw = await getCollectionProducts(FETCH_TAGS)
  const products = excludeProductsWithoutImages(excludeSafetyProducts(excludeKidsProducts(raw)))

  const isWomens = (p: (typeof products)[0]) => p.title.includes("Wo's")
  const mens = products.filter((p) => !isWomens(p))
  const byTag = (tag: string) =>
    mens.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))

  const tabGroups = {
    'Jackets': byTag('Jackets'),
    'Puffers': byTag('Puffers'),
    'Sweats': byTag('Sweatshirts'),
    "Women's": products.filter((p) => isWomens(p)),
  }

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-6 text-gray-400">Outer Wear</h1>
        <CategoryFilter all={products} tabGroups={tabGroups} tabs={TABS} />
      </main>
    </div>
  )
}
