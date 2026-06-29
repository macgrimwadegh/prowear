"use client"

import { useState } from "react"
import SiteHeader from "../../../components/site-header"

export default function KidsTeePage() {
  const [selectedColor, setSelectedColor] = useState("Gray Heather")
  const [selectedSize, setSelectedSize] = useState("8")

  const colors = [
    { name: "White", value: "#ffffff", border: "border-black" },
    { name: "Aqua", value: "#00bcd4" },
    { name: "Black", value: "#000000" },
    { name: "Bottle", value: "#1b5e20" },
    { name: "Gold", value: "#ffc107" },
    { name: "Hot Pink", value: "#e91e63" },
    { name: "Teal", value: "#009688" },
    { name: "Navy", value: "#1a237e" },
    { name: "Emerald", value: "#4caf50" },
    { name: "Lime", value: "#8bc34a" },
    { name: "Light Blue", value: "#87ceeb" },
    { name: "Maroon", value: "#800000" },
    { name: "Orange", value: "#ff5722" },
    { name: "Pea Green", value: "#689f38" },
    { name: "Purple", value: "#9c27b0" },
    { name: "Red", value: "#f44336" },
    { name: "Royal", value: "#3f51b5" },
    { name: "Sky Blue", value: "#87ceeb" },
    { name: "Soft Pink", value: "#f8bbd9" },
    { name: "Gray Heather", value: "#9e9e9e" },
    { name: "Yellow", value: "#ffeb3b" },
  ]

  const sizes = ["2", "4", "6", "8", "10", "12", "14"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <SiteHeader />

      {/* Main Content - Product Details */}
      <main className="px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="flex justify-center bg-transparent text-transparent">
              <div className="w-full flex items-center justify-center p-4 bg-transparent">
                <img
                  src="/images/1KT-kids-tee-gray.jpg"
                  alt="Kids Tee 1KT"
                  className="w-full h-auto object-contain max-h-[400px] sm:max-h-[500px]"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide mb-4">KIDS TEE 1KT</h1>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {
                    "Built for comfort and durability, the Classic Fit Tee features a JB's shape-staying elastane rib crew neck and is made from 100% cotton for all-day wear (marle colours crafted from a cotton/viscose blend). Constructed with a heavy 190gsm ring-spun jersey knit, it delivers both softness and strength. Additional details include self-fabric tape on the inside neck and shoulders for stability, twin-needle double-stitched seams, and vertical side seams to reduce twisting."
                  }
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  <br />
                </p>
              </div>

              {/* Colors Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-wide mb-4">COLOURS</h3>
                <div className="grid grid-cols-7 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all border-2 ${color.border || "border-gray-300"} ${
                        selectedColor === color.name
                          ? "border-black scale-110 shadow-lg"
                          : "hover:border-gray-600 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Sizing Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-wide mb-4">SIZING</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border border-gray-300 py-2 px-2 sm:px-4 text-center hover:bg-black hover:text-white transition-colors font-medium text-sm sm:text-base ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <p className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">JBSWEAR KIDS TEE 1KT</p>
              </div>

              {/* Category Navigation */}
              <div className="pt-4">{/* Category Navigation Content */}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
