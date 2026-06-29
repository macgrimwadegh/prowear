"use client"

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useQuoteCart } from '../contexts/quote-cart-context'

const NAV_LINKS = [
  { label: 'BASE WEAR', href: '/basewear' },
  { label: 'OUTER WEAR', href: '/outerwear' },
  { label: 'WORK WEAR', href: '/workwear' },
  { label: 'SWIM WEAR', href: '/swimwear' },
  { label: 'HEAD WEAR', href: '/headwear' },
]

export default function DropdownNavigationDark() {
  const { totalItems } = useQuoteCart()

  return (
    <nav className="flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-sm text-white uppercase tracking-wide flex-wrap">
      {NAV_LINKS.map((link, i) => (
        <React.Fragment key={link.href}>
          <Link href={link.href} className="hover:text-gray-300 transition-colors">
            {link.label}
          </Link>
          {i < NAV_LINKS.length - 1 && (
            <span className="text-gray-600">•</span>
          )}
        </React.Fragment>
      ))}
      <span className="text-gray-600">•</span>
      <Link href="/quote" className="relative hover:text-gray-300 transition-colors text-white">
        <ShoppingBag size={16} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  )
}
