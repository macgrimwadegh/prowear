import ShopHeader from '../components/shop-header'
import CategoryFilter from '../components/category-filter'
import { getCollectionProducts, excludeKidsProducts } from '../../lib/shopify-storefront'

const TAGS = ['Jackets', 'Puffers']

export default async function OuterwearPage() {
  const raw = await getCollectionProducts(TAGS)
  const products = excludeKidsProducts(raw)

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-6 text-gray-400">Outer Wear</h1>
        <CategoryFilter products={products} tabs={TAGS} />
      </main>
    </div>
  )
}
