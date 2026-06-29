"use client"

import { useState } from 'react'
import Link from 'next/link'
import ShopHeader from '../components/shop-header'
import { useQuoteCart } from '../contexts/quote-cart-context'
import { SIZES, type QuoteFormData } from '../../lib/quote-types'

const emptyForm: QuoteFormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  additionalNotes: '',
}

export default function QuotePage() {
  const { items, removeItem, clearCart } = useQuoteCart()
  const [form, setForm] = useState<QuoteFormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFieldChange(field: keyof QuoteFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.businessName || !form.contactName || !form.email) {
      setError('Please fill in Business Name, Contact Name, and Email.')
      return
    }
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items }),
      })
      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to submit quote. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <ShopHeader />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <p className="text-xs tracking-widest uppercase">Quote Submitted</p>
            <p className="text-xs text-gray-500 mt-2">We'll be in touch soon at {form.email}</p>
            <button
              type="button"
              onClick={() => {
                clearCart()
                setSubmitted(false)
                setForm(emptyForm)
              }}
              className="text-xs underline mt-8 block mx-auto hover:text-gray-600 transition-colors"
            >
              Start a new quote
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="max-w-4xl mx-auto px-6 py-8">

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Your quote is empty.</p>
            <Link
              href="/basewear"
              className="text-xs underline hover:text-gray-600 transition-colors"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <h2 className="text-xs tracking-widest uppercase mb-6">
              Your Quote ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>

            <div className="space-y-0">
              {items.map((item) => {
                const sizeEntries = SIZES.filter((s) => item.quantities[s] > 0)
                const sizesText = sizeEntries.map((s) => `${s}: ${item.quantities[s]}`).join(', ')

                return (
                  <div key={item.id}>
                    <div className="flex gap-4 py-4">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productTitle}
                          className="w-20 h-20 object-cover bg-gray-50 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-50 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-widest font-medium">{item.productTitle}</p>
                        {item.selectedColor && (
                          <p className="text-xs text-gray-500 mt-0.5">Colour: {item.selectedColor}</p>
                        )}
                        {sizesText && (
                          <p className="text-xs text-gray-500 mt-0.5">{sizesText}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-0.5">{item.totalUnits} units total</p>
                        {item.notes && (
                          <p className="text-xs text-gray-400 italic mt-1">{item.notes}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors flex-shrink-0 self-start text-sm leading-none"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                    <div className="border-b border-gray-100" />
                  </div>
                )
              })}
            </div>

            {/* Submission form */}
            <form onSubmit={handleSubmit} noValidate>
              <h2 className="text-xs tracking-widest uppercase mb-6 mt-10">Your Details</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={(e) => handleFieldChange('businessName', e.target.value)}
                    className="border-b border-gray-200 w-full py-2 text-xs focus:outline-none focus:border-black bg-transparent"
                    placeholder="Your organisation or business name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => handleFieldChange('contactName', e.target.value)}
                    className="border-b border-gray-200 w-full py-2 text-xs focus:outline-none focus:border-black bg-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className="border-b border-gray-200 w-full py-2 text-xs focus:outline-none focus:border-black bg-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="border-b border-gray-200 w-full py-2 text-xs focus:outline-none focus:border-black bg-transparent"
                    placeholder="0400 000 000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    value={form.additionalNotes}
                    onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
                    className="border border-gray-200 w-full py-2 px-3 text-xs focus:outline-none focus:border-black resize-none h-20 bg-transparent"
                    placeholder="Any additional information about your order..."
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 mt-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="bg-black text-white text-[10px] tracking-widest uppercase py-3 px-8 mt-6 hover:bg-gray-900 disabled:bg-gray-300 transition-colors"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT QUOTE REQUEST'}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
