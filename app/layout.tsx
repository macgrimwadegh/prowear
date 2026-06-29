import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { QuoteCartProvider } from "./contexts/quote-cart-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  title: "PROWEAR - Custom Clothing Supply",
  description: "Premium custom clothing supply with in-house printing & embroidery since 2003",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuoteCartProvider>{children}</QuoteCartProvider>
      </body>
    </html>
  )
}
