export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'] as const
export type Size = typeof SIZES[number]
export type SizeQuantities = Record<Size, number>

export interface QuoteCartItem {
  id: string // `${productHandle}-${selectedColor}`
  productId: string
  productHandle: string
  productTitle: string
  productImage: string
  price: number
  selectedColor: string
  quantities: SizeQuantities
  totalUnits: number
  notes: string
}

export interface QuoteFormData {
  businessName: string
  contactName: string
  email: string
  phone: string
  additionalNotes: string
}
