"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

// Complete DropdownNavigationDark component embedded
function DropdownNavigationDark() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  const handleMouseEnter = (dropdown: string) => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(dropdown)
      }, 150)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null)
      }, 300)
    }
  }

  const handleClick = (dropdown: string) => {
    if (isMobile) {
      setOpenDropdown(openDropdown === dropdown ? null : dropdown)
    } else {
      setOpenDropdown(dropdown)
    }
  }

  const handleLinkClick = () => {
    setOpenDropdown(null)
  }

  const baseWearItems = [
    { name: "T-Shirts", href: "/base-wear/t-shirts" },
    { name: "Long Sleeve T-Shirts", href: "/base-wear/long-sleeve-t-shirts" },
    { name: "Polos", href: "/base-wear/polos" },
  ]

  const outerWearItems = [
    { name: "Jumpers", href: "/outer-wear/jumpers" },
    { name: "Jackets", href: "/outer-wear/jackets" },
  ]

  const workWearItems = [
    { name: "HI VIZ", href: "/work-wear/hi-viz" },
    { name: "FLEECE", href: "/work-wear/fleece" },
    { name: "Shirts", href: "/work-wear/shirts" },
    { name: "Pants", href: "/work-wear/pants" },
  ]

  return (
    <div
      ref={dropdownRef}
      className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-sm text-white uppercase tracking-wide overflow-x-auto md:overflow-visible whitespace-nowrap px-2 max-w-full"
    >
      {/* BASE WEAR Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative">
          <button
            className="hover:text-gray-300 transition-colors cursor-pointer focus:outline-none active:text-gray-400"
            onMouseEnter={() => handleMouseEnter("basewear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("basewear")}
            onTouchStart={() => handleClick("basewear")}
            style={{ WebkitTapHighlightColor: "transparent" }}
            type="button"
            aria-expanded={openDropdown === "basewear"}
          >
            BASE WEAR
          </button>
          {openDropdown === "basewear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] z-[9999] mt-1 max-w-[90vw]"
              onMouseEnter={() => handleMouseEnter("basewear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                {baseWearItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                      onClick={handleLinkClick}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span className="mx-1 sm:mx-0">•</span>
      </div>

      {/* OUTER WEAR Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative">
          <button
            className="hover:text-gray-300 transition-colors cursor-pointer focus:outline-none active:text-gray-400"
            onMouseEnter={() => handleMouseEnter("outerwear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("outerwear")}
            onTouchStart={() => handleClick("outerwear")}
            style={{ WebkitTapHighlightColor: "transparent" }}
            type="button"
            aria-expanded={openDropdown === "outerwear"}
          >
            OUTER WEAR
          </button>
          {openDropdown === "outerwear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] z-[9999] mt-1 max-w-[90vw]"
              onMouseEnter={() => handleMouseEnter("outerwear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                {outerWearItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                      onClick={handleLinkClick}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span className="mx-1 sm:mx-0">•</span>
      </div>

      {/* WORK WEAR Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative">
          <button
            className="hover:text-gray-300 transition-colors cursor-pointer focus:outline-none active:text-gray-400"
            onMouseEnter={() => handleMouseEnter("workwear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("workwear")}
            onTouchStart={() => handleClick("workwear")}
            style={{ WebkitTapHighlightColor: "transparent" }}
            type="button"
            aria-expanded={openDropdown === "workwear"}
          >
            WORK WEAR
          </button>
          {openDropdown === "workwear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] z-[9999] mt-1 max-w-[90vw]"
              onMouseEnter={() => handleMouseEnter("workwear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                {workWearItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                      onClick={handleLinkClick}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span className="mx-1 sm:mx-0">•</span>
      </div>

      {/* SWIM WEAR - No Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <span className="hover:text-gray-300 transition-colors cursor-default">SWIM WEAR</span>
        <span className="mx-1 sm:mx-0">•</span>
      </div>

      {/* HEAD WEAR - No Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <span className="hover:text-gray-300 transition-colors cursor-default">HEAD WEAR</span>
      </div>
    </div>
  )
}

export default function InnerJacketPage() {
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("")

  const colors = [{ name: "black", value: "#000000", label: "Black" }]

  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="w-full py-4 sm:py-6 bg-black">
        <nav className="flex flex-col items-center justify-center w-full space-y-3 sm:space-y-4 px-4">
          {/* Top - PROWEAR Logo */}
          <Link href="/" className="flex-shrink-0">
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 570 50"
              className="h-6 sm:h-8 md:h-10 w-auto hover:opacity-80 transition-opacity"
              fill="white"
            >
              <path d="M306.84,29.4c2.7-7.92,5.33-15.5,7.83-23.12.52-1.59,1.27-2.07,2.9-2.04,4.49.12,8.99.04,13.81.04-1.36,3.71-2.6,7.13-3.86,10.54-3.06,8.2-6.2,16.38-9.14,24.61-1.39,3.88-3.81,6.34-7.95,6.87-4.32.54-8.09-.53-10.73-4.22-5.27-7.39-10.47-14.82-15.7-22.25-.3-.42-.59-.84-1-1.43-.4.45-.75.8-1.03,1.18-5.18,7.39-10.32,14.79-15.55,22.14-3.11,4.39-8.36,5.9-13.38,3.97-2.36-.9-4.08-2.49-4.97-4.94-4.21-11.53-8.45-23.04-12.67-34.57-.18-.48-.28-.99-.48-1.75.73-.05,1.34-.13,1.95-.14,4.12-.01,8.23.07,12.35-.05,1.55-.05,2.14.54,2.58,1.94,2.41,7.45,4.93,14.88,7.42,22.31.06.18.2.32.47.77.44-.6.81-1.06,1.15-1.55,4.31-6.47,8.98-12.73,12.83-19.46,3.6-6.29,15.7-6.28,19.37.21,3.82,6.76,8.47,13.03,12.76,19.51.28.43.61.83,1.06,1.43" />
              <path d="M230.89,14.76c-3.19-4.99-8.19-7.36-13.67-8.81-9.97-2.66-20.15-2.79-30.35-2.13-6.74.45-13.39,1.4-19.57,4.42-10.18,4.97-13.68,17.51-7.54,27.03,2.57,3.97,6.43,6.25,10.75,7.8,7.99,2.87,16.34,3.26,26,3.41,2.18-.1,5.65-.19,9.1-.48,6.06-.53,12.04-1.53,17.6-4.23,10.18-4.96,13.78-17.46,7.68-27ZM216.57,29.6c-1.05,2.4-3,3.85-5.44,4.39-2.85.64-5.78,1.21-8.69,1.33-7.31.29-14.64.66-21.86-1-2.98-.7-5.77-1.99-6.67-5.15-1.96-6.9-.18-12.39,7.31-13.64,4.68-.78,9.46-.94,14.21-1.38,4.67.43,9.32.59,13.88,1.36,7.06,1.21,10.16,7.49,7.26,14.09Z" />
              <path d="M508.99,45.54h-16.21c-.06-.59-.17-1.16-.17-1.72,0-5.75.05-11.5-.04-17.26-.02-1.76.6-2.17,2.28-2.16,14.44.06,28.88.08,43.33-.02,2.17-.01,4.37-.63,6.46-1.27,1.49-.46,2.51-1.66,2.48-3.41-.03-1.72-1.02-2.96-2.51-3.41-1.97-.6-4.06-1.09-6.11-1.09-14.38-.09-28.76-.05-43.14-.05h-2.68c1.09-1.2,1.75-1.97,2.44-2.69,2.28-2.34,4.52-4.73,6.9-6.96.67-.64,1.78-1.16,2.69-1.16,11.63-.08,23.27-.12,34.9-.02,5.98.05,11.86.92,17.27,3.75,4.68,2.44,7.44,6.15,7.13,11.62-.31,5.43-3.52,8.82-8.23,10.99-1.46.68-3.05,1.08-4.61,1.63,5.29,4.31,10.52,8.56,16.09,13.12-.93.12-1.41.22-1.87.22-6.14.01-12.29.05-18.43-.04-.93-.01-2.03-.48-2.72-1.10-3.13-2.77-6.1-5.72-9.23-8.5-.7-.63-1.81-1.11-2.73-1.13-7.12-.09-14.25,0-21.37-.08-1.61-.02-1.99.58-1.94,2.05.08,2.86.02,5.72.02,8.69" />
              <path d="M80.15,14.15c3.34-3.12,6.65-6.26,10.03-9.33.41-.38,1.19-.52,1.8-.52,11.89-.01,23.79-.1,35.7.04,5.92.07,11.72,1.04,17.04,3.91,6.96,3.77,8.94,11.93,4.34,18-2.17,2.87-5.22,4.48-8.63,5.45-.62.18-1.22.36-1.87.55,5.33,4.36,10.56,8.64,16.19,13.23-1.06.08-1.61.16-2.15.16-6.01.01-12.03.06-18.05-.05-.99-.02-2.17-.47-2.92-1.13-3.08-2.72-5.98-5.66-9.07-8.38-.75-.67-1.92-1.19-2.91-1.19-7.13-.11-14.26-.02-21.38-.09-1.45-.01-1.78.53-1.74,1.83.07,2.92.02,5.85.02,9.02h-9.99c-1.5,0-3.02-.12-4.51.02-1.65.16-1.96-.55-1.94-2.02.06-5.69.08-11.38-.02-17.07-.03-1.73.47-2.2,2.21-2.2,14.38.07,28.77.08,43.15-.01,2.17-.02,4.39-.58,6.47-1.22,1.53-.47,2.75-1.61,2.7-3.47-.05-1.79-1.19-3.03-2.73-3.48-2.04-.59-4.21-1.02-6.32-1.03-14.2-.08-28.38-.04-42.57-.04h-2.25c-.21-.34-.41-.67-.6-.99" />
              <path d="M398.06,35.52c-3.14,3.21-6.27,6.47-9.47,9.62-.44.44-1.3.58-1.97.58-15.77.03-31.52.02-47.28.04-1.06,0-1.89,0-1.88-1.49.05-13.07.05-26.15.07-39.23,0-.12.05-.25.13-.57h60.41c-.9.96-1.6,1.76-2.33,2.53-2.24,2.3-4.41,4.65-6.76,6.82-.77.71-2.01,1.26-3.05,1.27-9.94.09-19.88.11-29.82,0-2.01-.02-2.2.85-2.22,2.46-.03,1.71.38,2.4,2.29,2.38,12.23-.08,24.45-.05,36.68-.04.68,0,1.37.06,2.06.09.12.21.24.42.37.63-2.96,2.83-5.88,5.7-8.92,8.45-.47.44-1.47.42-2.22.42-9.29.03-18.57.08-27.86-.01-1.96-.02-2.61.64-2.37,2.47.05.38.05.78.01,1.17-.14,1.4.34,2.1,1.87,1.94.84-.09,1.7-.02,2.55-.02h39.55c.05.16.11.33.16.49" />
              <path d="M399.82,45.61c3.91-4.38,7.48-8.36,11.05-12.34,7.2-8.03,14.46-15.99,21.57-24.1,4.49-5.13,9.9-6.92,16.34-4.78,1.9.63,3.81,1.9,5.15,3.39,10.04,11.26,19.94,22.65,29.89,34,1.02,1.16,2.01,2.34,3.21,3.73-.68.12-1.03.22-1.39.23-5.49,0-10.98.05-16.48-.05-.84-.01-2.03-.49-2.45-1.15-2.69-4.19-6.4-5.28-11.28-5.04-8.09.42-16.21.12-24.31.11-.76,0-1.52-.06-2.75-.12,3.35-3.64,6.35-6.97,9.45-10.21.36-.38,1.2-.42,1.81-.43,3.53-.04,7.06-.02,10.6-.02.62,0,1.24-.07,2.28-.14-3.01-3.52-5.75-6.74-8.69-10.19-.58.54-1.16.98-1.64,1.52-7.2,8.03-14.4,16.06-21.55,24.12-.99,1.1-1.97,1.67-3.51,1.64-5.04-.1-10.07-.04-15.1-.05-.57,0-1.13-.07-2.21-.14" />
              <path d="M2.97,14.52c3.34-3.28,6.66-6.57,10.04-9.79.4-.38,1.2-.43,1.82-.43,11.25-.02,22.49-.08,33.73,0,5.88.05,11.6,1.05,16.75,4.13,9.18,5.48,9.36,16.76.25,22.35-2.3,1.41-4.95,2.43-7.58,3.04-3.28.76-6.7,1.19-10.08,1.25-8.95.16-17.91.1-26.86.01-1.66-.01-2.16.52-2.09,2.13.11,2.72.03,5.45.03,8.31H2.84c-.04-.8-.1-1.51-.1-2.2,0-5.43,0-10.85,0-16.28,0-2.59,0-2.6,2.52-2.6,14.19,0,28.38.05,42.56-.06,1.9-.02,3.84-.61,5.66-1.23,1.54-.54,2.56-1.98,2.14-3.56-.33-1.24-1.26-2.78-2.33-3.26-1.78-.79-3.9-1.12-5.88-1.14-13.98-.08-27.97-.05-41.97-.04h-2.13c-.12-.21-.22-.42-.34-.63" />
            </svg>
          </Link>

          {/* Bottom - Navigation */}
          <div className="flex justify-center w-full">
            <DropdownNavigationDark />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden bg-white flex items-center justify-center">
              <img
                src="/images/3INJ-inner-jacket-black.jpg"
                alt="Inner Jacket 3INJ"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide mb-2">
                  INNER JACKET 3INJ
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {"Built for durability and comfort, the Urban Fit Work Jacket features a 65% polyester, 35% cotton canvas shell with a low-pill polar fleece lining for lasting warmth and wear. Designed with a zip-through high collar, two front welt pockets, three internal pockets, and a dedicated internal phone pocket for secure storage. The mid-length cut offers extra coverage, while the embroidery zipper allows easy customization."}
                </p>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-black uppercase tracking-wide">Color</h3>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                        selectedColor === color.name
                          ? "border-black scale-110"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                      aria-label={`Select ${color.label} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-black uppercase tracking-wide">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 border text-sm font-medium transition-all duration-200 hover:border-black ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Description */}
              <div>
                <p className="font-bold text-sm text-black">JBS INNER JACKET</p>
              </div>

              {/* Add to Cart Button */}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
