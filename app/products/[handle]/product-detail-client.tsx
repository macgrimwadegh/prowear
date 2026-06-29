"use client"

import { useState, useEffect } from 'react'
import type { ShopifyProduct } from '../../../lib/shopify-storefront'
import { getProductColors, getColorImage } from '../../../lib/shopify-storefront'
import { SIZES, type Size, type SizeQuantities } from '../../../lib/quote-types'
import { useQuoteCart } from '../../contexts/quote-cart-context'

const COLOR_MAP: Record<string, string> = {
  white: 'bg-white border-gray-300',
  black: 'bg-black',
  navy: 'bg-[#001F5B]',
  'navy blue': 'bg-[#001F5B]',
  red: 'bg-red-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  grey: 'bg-gray-400',
  gray: 'bg-gray-400',
  'light grey': 'bg-gray-300',
  'light gray': 'bg-gray-300',
  charcoal: 'bg-gray-700',
  yellow: 'bg-yellow-400',
  orange: 'bg-orange-500',
  purple: 'bg-purple-600',
  pink: 'bg-pink-400',
  brown: 'bg-amber-800',
  khaki: 'bg-stone-400',
  'bottle green': 'bg-green-900',
  royal: 'bg-blue-700',
  'royal blue': 'bg-blue-700',
  maroon: 'bg-red-900',
  teal: 'bg-teal-500',
}

function getColorClasses(color: string): string {
  const key = color.toLowerCase()
  return COLOR_MAP[key] || 'bg-gray-200'
}

function makeEmptyQuantities(): SizeQuantities {
  return { XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 }
}

interface Props {
  product: ShopifyProduct
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem } = useQuoteCart()

  const colors = getProductColors(product)
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || '')
  const [quantities, setQuantities] = useState<SizeQuantities>(makeEmptyQuantities())
  const [notes, setNotes] = useState('')
  const [added, setAdded] = useState(false)
  const [currentImage, setCurrentImage] = useState<string>(
    product.featuredImage?.url || product.images.edges[0]?.node.url || ''
  )

  // Update image when color changes
  useEffect(() => {
    if (selectedColor) {
      const colorImg = getColorImage(product, selectedColor)
      if (colorImg) setCurrentImage(colorImg)
    }
  }, [selectedColor, product])

  const totalUnits = Object.values(quantities).reduce((a, b) => a + b, 0)
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const formattedPrice = `$${price.toFixed(2)} ex GST`

  const allImages = product.images.edges.map((e) => e.node)

  function handleQuantityChange(size: Size, value: string) {
    const num = Math.max(0, parseInt(value, 10) || 0)
    setQuantities((prev) => ({ ...prev, [size]: num }))
  }

  function handleAddToQuote() {
    if (totalUnits === 0) {
      alert('Please enter quantities for at least one size.')
      return
    }
    if (!selectedColor && colors.length > 0) {
      alert('Please select a colour.')
      return
    }

    addItem({
      id: `${product.handle}-${selectedColor}`,
      productId: product.id,
      productHandle: product.handle,
      productTitle: product.title,
      productImage: currentImage,
      price,
      selectedColor,
      quantities: { ...quantities },
      totalUnits,
      notes,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      {/* LEFT — Images */}
      <div>
        <img
          src={currentImage || '/images/placeholder.png'}
          alt={product.title}
          className="w-full aspect-square object-cover bg-gray-50"
        />
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {allImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentImage(img.url)}
                className={`w-14 h-14 border-2 overflow-hidden flex-shrink-0 transition-all ${
                  currentImage === img.url ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.altText || product.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT — Details */}
      <div>
        <h1 className="text-sm uppercase tracking-widest font-medium mb-1">{product.title}</h1>
        <p className="text-xs text-gray-500 mb-6">{formattedPrice}</p>

        {/* Colour selection */}
        {colors.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Colour</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const colorClasses = getColorClasses(color)
                const isSelected = selectedColor === color
                return (
                  <button
                    key={color}
                    type="button"
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${colorClasses} ${
                      isSelected ? 'border-black scale-110' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  />
                )
              })}
            </div>
            {selectedColor && (
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{selectedColor}</p>
            )}
          </div>
        )}

        {/* Quantities */}
        <div className="mb-4">
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Quantities</p>
          <table className="w-auto">
            <thead>
              <tr>
                <th className="text-[10px] tracking-widest uppercase text-gray-400 font-normal text-left pr-8 pb-2">
                  Size
                </th>
                <th className="text-[10px] tracking-widest uppercase text-gray-400 font-normal text-left pb-2">
                  Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size) => (
                <tr key={size}>
                  <td className="text-xs uppercase tracking-widest pr-8 py-1 text-gray-700">{size}</td>
                  <td className="py-1">
                    <input
                      type="number"
                      min="0"
                      value={quantities[size] || ''}
                      placeholder="0"
                      onChange={(e) => handleQuantityChange(size, e.target.value)}
                      className="w-16 text-center text-xs border-b border-gray-200 py-1 focus:outline-none focus:border-black bg-transparent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs tracking-widest uppercase text-gray-500 mt-3">
            Total: {totalUnits} Units
          </p>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">
            Decoration / Artwork Notes
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-200 text-xs p-3 resize-none h-20 focus:outline-none focus:border-black"
            placeholder="e.g. Embroider logo on left chest, screen print back..."
          />
        </div>

        {/* Add to Quote */}
        <button
          type="button"
          onClick={handleAddToQuote}
          className="w-full bg-black text-white text-[10px] tracking-widest uppercase py-3 mt-4 hover:bg-gray-900 transition-colors"
        >
          {added ? 'ADDED TO QUOTE ✓' : 'ADD TO QUOTE'}
        </button>
      </div>
    </div>
  )
}
