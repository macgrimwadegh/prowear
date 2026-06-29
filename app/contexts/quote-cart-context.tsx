"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { QuoteCartItem } from '../../lib/quote-types'

interface QuoteCartContextValue {
  items: QuoteCartItem[]
  addItem: (item: QuoteCartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalItems: number
  totalUnits: number
}

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null)

const STORAGE_KEY = 'prowear-quote-cart'

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setItems(parsed)
          }
        }
      } catch {
        // ignore parse errors
      }
      setHydrated(true)
    }
  }, [])

  // Save to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (hydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch {
        // ignore storage errors
      }
    }
  }, [items, hydrated])

  const addItem = useCallback((item: QuoteCartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id)
      if (existingIndex >= 0) {
        // Upsert
        const updated = [...prev]
        updated[existingIndex] = item
        return updated
      }
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.length
  const totalUnits = items.reduce((sum, item) => sum + item.totalUnits, 0)

  return (
    <QuoteCartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalUnits }}>
      {children}
    </QuoteCartContext.Provider>
  )
}

export function useQuoteCart(): QuoteCartContextValue {
  const ctx = useContext(QuoteCartContext)
  if (!ctx) {
    throw new Error('useQuoteCart must be used within a QuoteCartProvider')
  }
  return ctx
}
