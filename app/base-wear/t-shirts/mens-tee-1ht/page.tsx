import SiteHeader from "../../../components/site-header"
import Link from "next/link"

const workWearItems = [
  { name: "HI VIZ", href: "/work-wear/hi-viz" },
  { name: "Fleece", href: "/work-wear/fleece" },
  { name: "Shirts", href: "/work-wear/shirts" },
  { name: "Pants", href: "/work-wear/pants" },
]

export default function MensTee1HTPage() {
  const sizes = ["3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <SiteHeader />

      {/* Main Content - Product Details */}
      <main className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex justify-center bg-transparent text-transparent">
              <div className="w-full flex items-center justify-center p-4 bg-transparent">
                <img
                  src="/images/1HT-mens-tee-new.jpg"
                  alt="Men's Tee 1HT"
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Product Title */}
              <div>
                <h1 className="text-3xl font-bold text-black uppercase tracking-wide mb-4">MEN'S TEE 1HT</h1>
                <p className="text-gray-700 leading-relaxed">
                  {
                    "This classic fit tee is made from 100% cotton and constructed with a heavy 190gsm ring-spun jersey knit for a premium feel and lasting durability. Features include a shape-retaining elastane rib crew neck, self-fabric taping at the neck and shoulders for added stability, twin-needle stitching, and vertical side seams to reduce twist. Certified to AS 4399:2020 for UPF protection."
                  }
                </p>
              </div>

              {/* Colors Section */}
              <div>
                <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-4">COLOURS</h3>
                <div className="grid grid-cols-8 gap-2">
                  {/* Row 1 */}
                  <div className="w-6 h-6 bg-[#F8F8FF] border-2 border-gray-300 rounded-full" title="Ice White"></div>
                  <div className="w-6 h-6 bg-[#00BFFF] rounded-full" title="Aqua Blue"></div>
                  <div className="w-6 h-6 bg-[#4B5320] rounded-full" title="Army"></div>
                  <div className="w-6 h-6 bg-[#6B8E23] rounded-full" title="Army Marle"></div>
                  <div className="w-6 h-6 bg-black rounded-full" title="Black"></div>
                  <div className="w-6 h-6 bg-[#191970] rounded-full" title="Dark Navy"></div>
                  <div className="w-6 h-6 bg-[#F4A460] rounded-full" title="Sand"></div>
                  <div className="w-6 h-6 bg-[#006A4E] rounded-full" title="Bottle"></div>

                  {/* Row 2 */}
                  <div className="w-6 h-6 bg-[#708090] rounded-full" title="Charcoal"></div>
                  <div className="w-6 h-6 bg-[#6F8FAF] rounded-full" title="Denim Marle"></div>
                  <div className="w-6 h-6 bg-[#DC143C] rounded-full" title="Ice Red"></div>
                  <div className="w-6 h-6 bg-[#FFD700] rounded-full" title="Gold"></div>
                  <div className="w-6 h-6 bg-[#2F4F4F] rounded-full" title="Graphite"></div>
                  <div className="w-6 h-6 bg-[#808080] rounded-full" title="Grey Marle"></div>
                  <div className="w-6 h-6 bg-[#2C3539] rounded-full" title="Gunmetal"></div>
                  <div className="w-6 h-6 bg-[#FF1493] rounded-full" title="Hot Pink"></div>

                  {/* Row 3 */}
                  <div className="w-6 h-6 bg-[#4B0082] rounded-full" title="Indigo"></div>
                  <div className="w-6 h-6 bg-[#00A86B] rounded-full" title="Jade"></div>
                  <div className="w-6 h-6 bg-[#0C1844] rounded-full" title="Jet Navy"></div>
                  <div className="w-6 h-6 bg-[#228B22] rounded-full" title="Kelly Green"></div>
                  <div className="w-6 h-6 bg-[#32CD32] rounded-full" title="Lime"></div>
                  <div className="w-6 h-6 bg-[#ADD8E6] rounded-full" title="Lt Blue"></div>
                  <div className="w-6 h-6 bg-[#800000] rounded-full" title="Maroon"></div>
                  <div className="w-6 h-6 bg-[#000080] rounded-full" title="Navy"></div>

                  {/* Row 4 */}
                  <div className="w-6 h-6 bg-[#CC7722] rounded-full" title="Ochre"></div>
                  <div className="w-6 h-6 bg-[#FF4500] rounded-full" title="Orange"></div>
                  <div className="w-6 h-6 bg-[#9ACD32] rounded-full" title="Pea Green"></div>
                  <div className="w-6 h-6 bg-[#800080] rounded-full" title="Purple"></div>
                  <div className="w-6 h-6 bg-[#FF0000] rounded-full" title="Red"></div>
                  <div className="w-6 h-6 bg-[#4169E1] rounded-full" title="Royal"></div>
                  <div className="w-6 h-6 bg-[#87CEEB] rounded-full" title="Sky Blue"></div>
                  <div className="w-6 h-6 bg-[#918E85] rounded-full" title="Stone Marle"></div>

                  {/* Row 5 */}
                  <div className="w-6 h-6 bg-[#71797E] rounded-full" title="Steel Grey"></div>
                  <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full" title="White"></div>
                  <div className="w-6 h-6 bg-[#FFFF00] rounded-full" title="Yellow"></div>
                </div>
              </div>

              {/* Sizing Section */}
              <div>
                <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-4">SIZING</h3>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 py-2 px-4 text-center hover:bg-black hover:text-white transition-colors font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm font-bold text-black uppercase tracking-wider">JBS MEN'S TEE 1HT</p>
              </div>

              {/* Category Navigation */}
              <div className="pt-4">
                {/* Navigation Links */}
                {workWearItems.map((item) => (
                  <Link key={item.name} href={item.href} className="text-gray-500 hover:text-black">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
