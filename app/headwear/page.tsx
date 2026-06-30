import ShopHeader from '../components/shop-header'
import CategoryFilter from '../components/category-filter'
import {
  getCollectionProducts,
  excludeKidsProducts,
  excludeProductsWithoutImages,
  excludeSafetyProducts,
} from '../../lib/shopify-storefront'

const FETCH_TAGS = ['Headwear', 'Caps', 'Snapbacks', 'Beanies', 'Bucket Hats', 'Five Panel', 'Truckers']
const TABS = [...FETCH_TAGS, "Women's"]

export default async function HeadwearPage() {
  const raw = await getCollectionProducts(FETCH_TAGS)
  const products = excludeProductsWithoutImages(excludeSafetyProducts(excludeKidsProducts(raw)))

  const tabGroups: Record<string, typeof products> = {}
  for (const tag of FETCH_TAGS) {
    tabGroups[tag] = products.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
  }
  tabGroups["Women's"] = products.filter((p) => p.title.includes("Wo's"))

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-6 text-gray-400">Head Wear</h1>
        <CategoryFilter all={products} tabGroups={tabGroups} tabs={TABS} />
      </main>
    </div>
  )
}
