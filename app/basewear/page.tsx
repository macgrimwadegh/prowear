import ShopHeader from '../components/shop-header'
import ProductGrid from '../components/product-grid'
import { getCollectionProducts } from '../../lib/shopify-storefront'

export default async function BasewearPage() {
  const tags = ['T-Shirts', 'T-Shirt', 'Tee', 'Longsleeves', 'Long Sleeve', 'Tanks', 'Singlets', 'Sweatshirts', 'Sweatshirt']
  const products = await getCollectionProducts(tags)

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-8 text-gray-400">Base Wear</h1>
        <ProductGrid products={products} emptyMessage="No base wear products found." />
      </main>
    </div>
  )
}
