"use client"
import SiteHeader from "../../../components/site-header"

export default function StapleTee5001Page() {
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
                  src="/images/5001-staple-tee-granite.jpg"
                  alt="Staple Tee 5001"
                  className="w-full h-auto object-contain max-h-[400px] sm:max-h-[500px]"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide mb-4">
                  STAPLE TEE 5001
                </h1>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {
                    "Enduring comfort in a regular fit, crafted from 180 GSM 100% combed cotton. Featuring neck ribbing, side seams, and double needle hems for durability and minimal shrinkage, it's a timeless choice for comfort and style. Available in 70+ colours. Built to last."
                  }
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  <br />
                </p>
              </div>

              {/* Colors Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-wide mb-4">COLOURS</h3>
                <div className="grid grid-cols-10 sm:grid-cols-13 gap-2">
                  {/* Row 1 */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FDF6E3]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F5F5DC]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F0E68C]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFFF99]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFD700]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFA500]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF8C00]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF6347]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#CD853F]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF4500] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#B22222] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DC143C] hidden sm:block"></div>

                  {/* Row 2 */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E6E6FA]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFB6C1]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFC0CB]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF69B4]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C71585]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#8B4513]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#A0522D]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#8B0000]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#800000]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#4B0000]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#696969] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#663399] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#4B0082] hidden sm:block"></div>

                  {/* Row 3 */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#808080]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#6495ED]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#778899]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#B0C4DE]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#5F9EA0]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#87CEEB]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0000FF]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#4169E1]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0000CD]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#000080]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#191970] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2F4F4F] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full hidden sm:block"></div>

                  {/* Row 4 */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E0FFFF]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#AFEEEE]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2E8B57]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#32CD32]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9ACD32]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#6B8E23]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#808000]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#556B2F]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#8FBC8F]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#20B2AA]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#008B8B] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#008080] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2F4F4F] hidden sm:block"></div>

                  {/* Row 5 */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#008B00]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#006400]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#228B22]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#654321]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#8B4513]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#A0522D]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D2691E]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#CD853F]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F4A460]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DEB887]"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D3D3D3] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C0C0C0] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#A9A9A9] hidden sm:block"></div>

                  {/* Row 6 */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#808080] sm:hidden"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#696969] sm:hidden"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2F2F2F] sm:hidden"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black border-2 border-white rounded-full sm:hidden"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#808080] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#696969] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2F2F2F] hidden sm:block"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black border-2 border-white rounded-full hidden sm:block"></div>
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
                  AS COLOUR STAPLE TEE 5001
                </p>
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
