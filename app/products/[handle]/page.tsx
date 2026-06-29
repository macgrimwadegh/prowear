import { notFound } from 'next/navigation'
import ShopHeader from '../../components/shop-header'
import ProductDetailClient from './product-detail-client'
import { getProductByHandle } from '../../../lib/shopify-storefront'

interface PageProps {
  params: { handle: string }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductByHandle(params.handle)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <ProductDetailClient product={product} />
      </main>
    </div>
  )
}
