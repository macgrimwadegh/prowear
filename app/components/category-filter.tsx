"use client"

import { useState } from 'react'
import ProductGrid from './product-grid'
import type { ShopifyProduct } from '../../lib/shopify-storefront'

interface Props {
  all?: ShopifyProduct[]
  tabGroups: Record<string, ShopifyProduct[]>
  tabs: string[]
}

export default function CategoryFilter({ tabGroups, tabs }: Props) {
  const visibleTabs = tabs.filter((t) => (tabGroups[t]?.length ?? 0) > 0)

  // Default to first populated tab — no "All" view
  const [active, setActive] = useState(() => visibleTabs[0] ?? tabs[0])

  const displayed = tabGroups[active] ?? []

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {visibleTabs.map((tab) => (
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

      <ProductGrid products={displayed} />
    </div>
  )
}
