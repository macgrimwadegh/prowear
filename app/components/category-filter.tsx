"use client"

import { useState } from 'react'
import ProductGrid from './product-grid'
import type { ShopifyProduct } from '../../lib/shopify-storefront'

interface Props {
  products: ShopifyProduct[]
  tabs: string[]
}

export default function CategoryFilter({ products, tabs }: Props) {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All'
      ? products
      : products.filter((p) =>
          p.tags.some((t) => t.toLowerCase() === active.toLowerCase())
        )

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...tabs].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
              active === tab
                ? 'border-black bg-black text-white'
                : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  )
}
