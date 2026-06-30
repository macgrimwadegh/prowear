"use client"

import { useState } from 'react'
import type { ShopifyProduct } from '../../../lib/shopify-storefront'
import { getProductColors, getColorImage } from '../../../lib/shopify-storefront'
import { SIZES, type Size, type SizeQuantities } from '../../../lib/quote-types'
import { useQuoteCart } from '../../contexts/quote-cart-context'

// Hex values for common apparel colour names.
// Keys are lowercase; partial-word matching is used as a fallback.
const COLOR_HEX: Record<string, string> = {
  // Core neutrals
  black: '#000000',
  white: '#FFFFFF',
  grey: '#888888',
  gray: '#888888',
  silver: '#C0C0C0',
  charcoal: '#3C3C3C',
  slate: '#6B7280',
  'mid grey': '#808080',
  'mid gray': '#808080',
  'dark grey': '#3A3A3A',
  'dark gray': '#3A3A3A',
  'light grey': '#C8C8C8',
  'light gray': '#C8C8C8',
  'dark charcoal': '#2B2B2B',

  // Blues
  navy: '#001A57',
  'navy blue': '#001A57',
  'french navy': '#001F5B',
  'dark navy': '#00124A',
  royal: '#2B4AC7',
  'royal blue': '#2B4AC7',
  cobalt: '#0047AB',
  blue: '#1E40AF',
  sky: '#7EC8E3',
  'sky blue': '#7EC8E3',
  'ice blue': '#A8D8EA',
  'powder blue': '#B0D0E8',
  'steel blue': '#4682B4',
  'dusty blue': '#7C9FB0',
  denim: '#1560BD',
  'electric blue': '#0088FF',
  midnight: '#1C1C54',
  ocean: '#006994',

  // Greens
  green: '#2D7A2D',
  bottle: '#005C3B',
  'bottle green': '#005C3B',
  forest: '#1B5E20',
  'forest green': '#1B5E20',
  army: '#4A5230',
  'military green': '#4A5230',
  khaki: '#B5A642',
  olive: '#6B6B3A',
  sage: '#A2A98B',
  mint: '#98E4C0',
  teal: '#007B77',
  emerald: '#007A4D',
  'hunter green': '#355E3B',
  jade: '#00A86B',

  // Reds & Pinks
  red: '#CC0000',
  'bright red': '#E8000C',
  'heritage red': '#9B1C1C',
  maroon: '#7B0000',
  burgundy: '#7B1535',
  wine: '#6B2737',
  brick: '#9C3B2F',
  rust: '#B7410E',
  coral: '#E8735A',
  pink: '#E8A0B0',
  'hot pink': '#E82C8A',
  'electric pink': '#E8005A',
  blush: '#E8C0C0',
  'dusty pink': '#C4969B',
  rose: '#C01C5E',

  // Yellows & Oranges
  yellow: '#F5C900',
  gold: '#CFA500',
  mustard: '#C89F00',
  amber: '#FFBF00',
  orange: '#E56400',
  lemon: '#F0E050',

  // Purples
  purple: '#6B2D8B',
  violet: '#6A0DAD',
  lavender: '#B57BDC',
  plum: '#7B1B6B',
  mauve: '#AA8899',

  // Browns & naturals
  brown: '#7B4520',
  chocolate: '#5C2C0A',
  tan: '#C89B6E',
  camel: '#B88B4A',
  stone: '#A89880',
  sand: '#C4A86A',
  natural: '#EDE0C8',
  oatmeal: '#E8D8C0',
  cream: '#FFFACD',
  linen: '#E8DFD0',
  earth: '#907060',
  fawn: '#C8A878',

  // Marles / heathered
  'athletic marle': '#B0B0B0',
  'grey marle': '#A8A8A8',
  'gray marle': '#A8A8A8',
  'charcoal marle': '#585858',
  'black marle': '#383838',
  'white marle': '#E8E8E8',
  'navy marle': '#2A3D80',
  'mid grey marle': '#909090',
  'light grey marle': '#C8C8C8',
  'royal marle': '#4060CC',
  'red marle': '#CC3030',
  marle: '#A8A8A8',

  // Washed / faded
  'washed black': '#2A2A2A',
  'faded navy': '#2A3D5A',
  'washed teal': '#3A7A78',

  // Hi-Vis
  'fluoro yellow': '#E8FF00',
  'fluoro orange': '#FF6000',
  'hi-vis yellow': '#E8FF00',
  'hi vis yellow': '#E8FF00',
  'hi-vis orange': '#FF6000',
  'hi vis orange': '#FF6000',
  'yellow fluro': '#E8FF00',
  'orange fluro': '#FF6000',
}

function getSwatchHex(colorName: string): string {
  const key = colorName.toLowerCase().trim()

  // Direct match
  if (COLOR_HEX[key]) return COLOR_HEX[key]

  // Word-by-word partial match (handles "Bottle Green/White", "Army/Black", etc.)
  const words = key.split(/[\s/\-,]+/).filter(Boolean)
  for (const word of words) {
    if (COLOR_HEX[word]) return COLOR_HEX[word]
  }

  return '#9E9E9E' // neutral grey fallback
}

// Used to add a visible border on very light swatches (white, cream, etc.)
function isLightHex(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.75
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
  const [currentImage, setCurrentImage] = useState<string>(() => {
    // Initialise with the image for the first colour if possible
    if (colors[0]) {
      const img = getColorImage(product, colors[0])
      if (img) return img
    }
    return product.featuredImage?.url || product.images.edges[0]?.node.url || ''
  })

  const totalUnits = Object.values(quantities).reduce((a, b) => a + b, 0)
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const formattedPrice = `$${price.toFixed(2)} ex GST`

  const allImages = product.images.edges.map((e) => e.node)

  function handleColorClick(color: string) {
    setSelectedColor(color)
    // Directly update image — no useEffect needed for clicks
    const img = getColorImage(product, color)
    if (img) setCurrentImage(img)
  }

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
                const hex = getSwatchHex(color)
                const light = isLightHex(hex)
                const isSelected = selectedColor === color
                return (
                  <button
                    key={color}
                    type="button"
                    title={color}
                    onClick={() => handleColorClick(color)}
                    style={{ backgroundColor: hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-black scale-110'
                        : light
                        ? 'border-gray-300 hover:border-gray-500'
                        : 'border-transparent hover:border-gray-400'
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
