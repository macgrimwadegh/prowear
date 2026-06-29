import ShopHeader from '../components/shop-header'
import ProductGrid from '../components/product-grid'
import { getCollectionProducts } from '../../lib/shopify-storefront'

export default async function WorkwearPage() {
  const tags = ['Workwear', 'Aprons & Overalls']
  const products = await getCollectionProducts(tags)

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-8 text-gray-400">Work Wear</h1>
        <ProductGrid products={products} emptyMessage="No workwear products found." />
      </main>
    </div>
  )
}
