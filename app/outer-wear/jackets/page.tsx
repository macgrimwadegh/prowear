"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

// Complete DropdownNavigationDark component embedded
function DropdownNavigationDarkComponent() {
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

export default function JacketsPage() {
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
              viewBox="0 0 608 46.34"
              className="h-6 sm:h-8 hover:opacity-80 transition-opacity md:h-7 w-96"
              fill="white"
            >
              <path d="M.26,11.88C3.85,8.35,7.43,4.8,11.07,1.34c.43-.4,1.29-.46,1.96-.46,12.12-.02,24.22-.09,36.33,0,6.33.05,12.49,1.13,18.04,4.44,9.88,5.9,10.08,18.05.27,24.07-2.47,1.52-5.33,2.62-8.17,3.27-3.54.82-7.22,1.28-10.85,1.34-9.64.17-19.29.11-28.93.02-1.79-.02-2.33.56-2.25,2.29.12,2.93.03,5.87.03,8.95H.11c-.04-.86-.11-1.62-.11-2.37,0-5.84,0-11.69,0-17.53,0-2.79,0-2.8,2.72-2.8,15.28,0,30.56.05,45.83-.07,2.04-.02,4.14-.66,6.09-1.33,1.66-.58,2.97-1.74,2.91-3.73-.05-1.93-1.28-3.26-2.94-3.75-2.2-.63-4.53-1.1-6.81-1.11-15.49-.1-30.97-.06-46.46-.06h-2.42c-.22-.36-.44-.72-.65-1.07" />
              <path d="M83.38,11.49c3.59-3.36,7.16-6.74,10.8-10.05.45-.4,1.28-.56,1.94-.56,12.81-.02,25.62-.11,38.45.04,6.37.07,12.63,1.12,18.35,4.21,7.49,4.06,9.63,12.85,4.67,19.39-2.34,3.09-5.62,4.82-9.3,5.87-.67.19-1.32.39-2.01.59,5.74,4.7,11.37,9.31,17.43,14.25-1.14.09-1.73.17-2.32.17-6.48.02-12.96.07-19.43-.05-1.06-.02-2.34-.5-3.14-1.21-3.32-2.93-6.45-6.09-9.77-9.03-.81-.72-2.07-1.28-3.13-1.29-7.68-.12-15.35-.03-23.03-.1-1.56-.02-1.91.57-1.88,1.97.07,3.15.02,6.3.02,9.72h-10.76c-1.62,0-3.25-.13-4.86.03-1.77.17-2.11-.59-2.09-2.18.09-6.13.09-12.26-.02-18.38-.03-1.86.51-2.37,2.38-2.36,15.49.07,30.99.09,46.48-.02,2.33-.02,4.72-.63,6.97-1.31,1.65-.5,2.97-1.74,2.91-3.73-.05-1.93-1.28-3.26-2.94-3.75-2.2-.63-4.53-1.1-6.81-1.11-15.29-.09-30.57-.04-45.85-.04h-2.89c-.22-.36-.44-.72-.65-1.07" />
              <path d="M245.73,12.14c-3.44-5.37-8.82-7.93-14.72-9.49C220.27-.21,209.31-.35,198.32.36c-7.26.48-14.42,1.51-21.08,4.76-10.96,5.35-14.73,18.86-8.12,29.11,2.77,4.28,6.92,6.73,11.58,8.4,8.6,3.09,17.6,3.51,28,3.67,2.35-.11,6.09-.2,9.8-.52,6.53-.57,12.97-1.65,18.96-4.56,10.96-5.34,14.84-18.8,8.27-29.08ZM230.3,28.12c-1.13,2.59-3.23,4.15-5.86,4.73-3.07.69-6.22,1.3-9.36,1.43-7.87.31-15.77.71-23.54-1.08-3.21-.75-6.21-2.14-7.18-5.55-2.11-7.43-.19-13.34,7.87-14.69,5.04-.84,10.19-1.01,15.3-1.49,5.03.46,10.04.64,14.95,1.47,7.6,1.3,10.94,8.07,7.82,15.18Z" />
              <path d="M327.52,27.91c2.91-8.53,5.74-16.69,8.43-24.9.56-1.71,1.37-2.23,3.12-2.2,4.84.12,9.68.04,14.88.04-1.47,4-2.8,7.68-4.16,11.35-3.3,8.84-6.68,17.64-9.85,26.51-1.5,4.18-4.1,6.82-8.56,7.4-4.66.59-8.71-.57-11.56-4.55-5.67-7.95-11.27-15.97-16.91-23.96-.32-.45-.63-.91-1.08-1.54-.43.49-.81.86-1.11,1.27-5.58,7.95-11.12,15.93-16.75,23.84-3.35,4.72-9,6.35-14.41,4.28-2.55-.97-4.39-2.69-5.36-5.32-4.53-12.41-9.1-24.82-13.65-37.23-.19-.52-.3-1.07-.52-1.89.79-.05,1.44-.14,2.1-.15,4.43-.02,8.87.08,13.3-.05,1.67-.05,2.3.59,2.78,2.09,2.6,8.03,5.31,16.02,7.99,24.03.07.19.21.35.51.82.48-.64.87-1.14,1.24-1.66,4.64-6.96,9.67-13.72,13.81-20.96,3.87-6.78,16.91-6.76,20.86.23,4.11,7.28,9.12,14.04,13.74,21.02.31.46.66.89,1.15,1.54" />
              <path d="M425.77,34.5c-3.39,3.46-6.75,6.96-10.2,10.36-.47.47-1.4.63-2.12.63-16.98.03-33.95.02-50.92.04-1.15,0-2.04,0-2.03-1.61.05-14.08.05-28.16.08-42.25,0-.13.06-.27.14-.61h65.06c-.96,1.04-1.72,1.9-2.51,2.72-2.41,2.47-4.75,5.01-7.28,7.34-.82.77-2.17,1.35-3.28,1.37-10.71.1-21.41.11-32.11,0-2.17-.02-2.36.92-2.39,2.65-.03,1.85.41,2.58,2.46,2.56,13.17-.09,26.33-.05,39.5-.04.73,0,1.47.07,2.22.1.13.22.26.45.4.67-3.19,3.05-6.34,6.14-9.61,9.1-.51.47-1.58.45-2.39.45-10.01.03-20,.08-30-.02-2.11-.02-2.81.69-2.55,2.66.06.41.06.84.02,1.26-.16,1.51.37,2.27,2.01,2.08.91-.1,1.83-.02,2.74-.02h42.59c.06.17.11.35.17.53" />
              <path d="M427.65,45.37c4.21-4.71,8.06-9,11.9-13.29,7.76-8.65,15.58-17.22,23.24-25.96,4.84-5.53,10.66-7.45,17.6-5.14,2.04.68,4.1,2.04,5.55,3.65,10.81,12.12,21.48,24.4,32.19,36.62,1.1,1.25,2.17,2.52,3.46,4.02-.73.12-1.11.24-1.49.25-5.91,0-11.83.06-17.74-.05-.91-.02-2.18-.53-2.64-1.24-2.9-4.52-6.89-5.69-12.15-5.42-8.71.45-17.46.12-26.19.12-.82,0-1.63-.07-2.96-.12,3.61-3.92,6.84-7.51,10.18-10.99.39-.41,1.29-.45,1.95-.46,3.81-.04,7.61-.02,11.41-.03.67,0,1.34-.07,2.46-.15-3.24-3.79-6.19-7.25-9.36-10.98-.63.58-1.25,1.05-1.76,1.63-7.76,8.65-15.51,17.29-23.21,25.98-1.06,1.19-2.13,1.8-3.78,1.76-5.42-.11-10.85-.04-16.26-.05-.61,0-1.22-.07-2.38-.15" />
              <path d="M545.23,45.29h-17.46c-.07-.63-.18-1.24-.18-1.85,0-6.2.06-12.39-.04-18.59-.03-1.9.64-2.33,2.46-2.32,15.55.07,31.1.09,46.67-.02,2.33-.02,4.71-.68,6.96-1.37,1.61-.49,2.7-1.79,2.67-3.67-.03-1.85-1.1-3.19-2.7-3.68-2.12-.64-4.38-1.17-6.58-1.18-15.49-.1-30.97-.06-46.46-.06h-2.89c1.17-1.29,1.88-2.12,2.63-2.89,2.46-2.52,4.87-5.09,7.43-7.5.72-.68,1.92-1.25,2.9-1.25,12.53-.08,25.06-.13,37.58-.02,6.45.06,12.78.99,18.6,4.04,5.04,2.63,8.01,6.62,7.67,12.51-.33,5.84-3.79,9.5-8.86,11.83-1.57.73-3.28,1.16-4.97,1.76,5.7,4.64,11.32,9.22,17.33,14.13-1,.12-1.52.24-2.02.24-6.62.02-13.24.06-19.85-.04-1-.02-2.18-.52-2.93-1.19-3.37-2.98-6.57-6.16-9.94-9.15-.76-.68-1.94-1.2-2.94-1.21-7.67-.1-15.35,0-23.02-.09-1.74-.02-2.14.63-2.09,2.21.09,3.08.03,6.16.03,9.35" />
            </svg>
          </Link>

          {/* Bottom - Navigation */}
          <div className="flex justify-center w-full">
            <DropdownNavigationDarkComponent />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sustainable Puffer Jacket */}
            <Link href="/outer-wear/jackets/sustainable-puffer-jk59" className="group">
              <div className="aspect-square overflow-hidden bg-white mb-4 flex items-center justify-center">
                <img
                  src="/images/JK59-sustainable-puffer-black.jpg"
                  alt="Sustainable Puffer JK59"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase tracking-wide">
                  SUSTAINABLE PUFFER JK59
                </h3>
              </div>
            </Link>

            {/* Podium Tech Jacket */}
            <Link href="/outer-wear/jackets/podium-tech-jacket-3tej" className="group">
              <div className="aspect-square overflow-hidden bg-white mb-4 flex items-center justify-center">
                <img
                  src="/images/3TEJ-podium-tech-jacket-blue.jpg"
                  alt="Podium Tech Jacket 3TEJ"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase tracking-wide">
                  PODIUM TECH JACKET 3TEJ
                </h3>
              </div>
            </Link>

            {/* Podium Layered Jacket */}
            <Link href="/outer-wear/jackets/podium-layered-jacket-3wsh" className="group">
              <div className="aspect-square overflow-hidden bg-white mb-4 flex items-center justify-center">
                <img
                  src="/images/3WSH-podium-layered-jacket-navy.jpg"
                  alt="Podium Layered Jacket 3WSH"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase tracking-wide">
                  PODIUM LAYERED JACKET 3WSH
                </h3>
              </div>
            </Link>

            {/* Podium Ladies Jacket */}
            <Link href="/outer-wear/jackets/podium-ladies-3wsj1" className="group">
              <div className="aspect-square overflow-hidden bg-white mb-4 flex items-center justify-center">
                <img
                  src="/images/3WSJ1-podium-ladies-charcoal.jpg"
                  alt="Podium Ladies 3WSJ1"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase tracking-wide">PODIUM LADIES 3WSJ1</h3>
              </div>
            </Link>

            {/* Soft Shell Jacket */}
            <Link href="/outer-wear/jackets/soft-shell-jacket-3lj" className="group">
              <div className="aspect-square overflow-hidden bg-white mb-4 flex items-center justify-center">
                <img
                  src="/images/3LJ-soft-shell-jacket-charcoal.jpg"
                  alt="Soft Shell Jacket 3LJ"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase tracking-wide">
                  SOFT SHELL JACKET 3LJ
                </h3>
              </div>
            </Link>

            {/* Inner Jacket */}
            <Link href="/outer-wear/jackets/inner-jacket-3inj" className="group">
              <div className="aspect-square overflow-hidden bg-white mb-4 flex items-center justify-center">
                <img
                  src="/images/3INJ-inner-jacket-black.jpg"
                  alt="Inner Jacket 3INJ"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-black uppercase tracking-wide">INNER JACKET 3INJ</h3>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
