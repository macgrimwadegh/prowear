"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function DropdownNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const baseWearRef = useRef<HTMLButtonElement>(null)
  const outerWearRef = useRef<HTMLButtonElement>(null)
  const workWearRef = useRef<HTMLButtonElement>(null)
  const headWearRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !event.target) return

      const target = event.target as Element
      if (!target.closest("[data-dropdown]")) {
        setActiveDropdown(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [activeDropdown])

  const getDropdownStyle = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (!buttonRef.current) {
      return {
        position: "absolute" as const,
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "8px",
        zIndex: 99999,
      }
    }

    return {
      position: "absolute" as const,
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: "8px",
      zIndex: 99999,
    }
  }

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (!isMobile) {
      setActiveDropdown(dropdown)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null)
      }, 150)
    }
  }

  const handleClick = (dropdown: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }
  }

  return (
    <div className="flex justify-center gap-4 text-sm text-gray-600 uppercase tracking-wide" data-dropdown>
      {/* BASE WEAR */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            ref={baseWearRef}
            className="hover:text-black transition-colors cursor-pointer focus:outline-none"
            onMouseEnter={() => handleMouseEnter("basewear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("basewear")}
            type="button"
          >
            BASE WEAR
          </button>

          {activeDropdown === "basewear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] z-[99999]"
              onMouseEnter={() => handleMouseEnter("basewear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                <li>
                  <Link
                    href="/base-wear/t-shirts"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    T-Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/base-wear/long-sleeve-t-shirts"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Long Sleeve T-Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/base-wear/polos"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Polos
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <span>•</span>
      </div>

      {/* OUTER WEAR */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            ref={outerWearRef}
            className="hover:text-black transition-colors cursor-pointer focus:outline-none"
            onMouseEnter={() => handleMouseEnter("outerwear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("outerwear")}
            type="button"
          >
            OUTER WEAR
          </button>

          {activeDropdown === "outerwear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] z-[99999]"
              onMouseEnter={() => handleMouseEnter("outerwear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                <li>
                  <Link
                    href="/outer-wear/jumpers"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Jumpers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outer-wear/jackets"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Jackets
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <span>•</span>
      </div>

      {/* WORK WEAR */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            ref={workWearRef}
            className="hover:text-black transition-colors cursor-pointer focus:outline-none"
            onMouseEnter={() => handleMouseEnter("workwear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("workwear")}
            type="button"
          >
            WORK WEAR
          </button>

          {activeDropdown === "workwear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[200px] z-[99999]"
              onMouseEnter={() => handleMouseEnter("workwear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                <li>
                  <Link
                    href="/work-wear/hi-viz"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    HI VIZ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work-wear/fleece"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Fleece
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work-wear/shirts"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work-wear/pants"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Pants
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <span>•</span>
      </div>

      {/* SWIM WEAR */}
      <div className="flex items-center gap-4">
        <span className="hover:text-black transition-colors cursor-default">SWIM WEAR</span>
        <span>•</span>
      </div>

      {/* HEAD WEAR */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            ref={headWearRef}
            className="hover:text-black transition-colors cursor-pointer focus:outline-none"
            onMouseEnter={() => handleMouseEnter("headwear")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("headwear")}
            type="button"
          >
            HEAD WEAR
          </button>

          {activeDropdown === "headwear" && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] z-[99999]"
              onMouseEnter={() => handleMouseEnter("headwear")}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-1">
                <li>
                  <Link
                    href="/head-wear/caps"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Caps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/head-wear/visors"
                    className="block px-3 py-1 text-[10px] font-medium text-black uppercase tracking-wide text-center hover:font-bold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Visors
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
