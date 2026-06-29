"use client"
import SiteHeader from "../../../components/site-header"

export default function BlockTubularTee5050TPage() {
  const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"]

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
                  src="/images/5050T-block-tee-walnut.jpg"
                  alt="Block Tubular Tee 5050T"
                  className="w-full h-auto object-contain max-h-[400px] sm:max-h-[500px]"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide mb-4">
                  BLOCK TUBULAR TEE 5050T
                </h1>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {
                    "Made from 100% carded cotton with a mid weight of 200 GSM. Featuring a regular fit that ensures comfort without compromising style, it includes neck ribbing, double needle hems, preshrunk fabric, and a tubular construction for lasting wear. Built to last."
                  }
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">{""}</p>
              </div>

              {/* Colors Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-wide mb-4">COLOURS</h3>
                <div className="grid grid-cols-4 gap-3">
                  {/* Top row */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F5F5DC]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#D3D3D3]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#D2B48C]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#8B4513]"></div>

                  {/* Second row */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DC143C]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2F4F2F]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#6B8E23]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#4169E1]"></div>

                  {/* Third row */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#191970]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#808080]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2F2F2F]"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black border-2 border-white rounded-full"></div>
                </div>
              </div>

              {/* Sizing Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-wide mb-4">SIZING</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 py-2 px-2 sm:px-4 text-center hover:bg-black hover:text-white transition-colors font-medium text-sm sm:text-base"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <p className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                  AS COLOUR BLOCK TUBULAR TEE 5050T
                </p>
              </div>

              {/* Category Navigation */}
              <div className="pt-4"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
