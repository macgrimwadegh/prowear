"use client"

import { useState, useEffect } from "react"
import DropdownNavigation from "./components/dropdown-navigation"

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const toggleService = (serviceName: string) => {
    setExpandedService(expandedService === serviceName ? null : serviceName)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center gap-0 mx-[-5px] my-1.5">
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full mx-auto">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 608 46.34"
            className="h-6 sm:h-12 md:h-[69px] w-auto mb-5 sm:mb-10 max-w-[90vw] mx-auto"
            fill="black"
          >
            <path d="M.26,11.88C3.85,8.35,7.43,4.8,11.07,1.34c.43-.4,1.29-.46,1.96-.46,12.12-.02,24.22-.09,36.33,0,6.33.05,12.49,1.13,18.04,4.44,9.88,5.9,10.08,18.05.27,24.07-2.47,1.52-5.33,2.62-8.17,3.27-3.54.82-7.22,1.28-10.85,1.34-9.64.17-19.29.11-28.93.02-1.79-.02-2.33.56-2.25,2.29.12,2.93.03,5.87.03,8.95H.11c-.04-.86-.11-1.62-.11-2.37,0-5.84,0-11.69,0-17.53,0-2.79,0-2.8,2.72-2.8,15.28,0,30.56.05,45.83-.07,2.04-.02,4.14-.66,6.09-1.33,1.66-.58,2.75-2.13,2.31-3.83-.35-1.34-1.35-2.99-2.51-3.51-1.92-.85-4.2-1.21-6.33-1.23-15.06-.09-30.12-.05-45.2-.04H.63c-.12-.23-.24-.45-.37-.68" />
            <path d="M83.38,11.49c3.59-3.36,7.16-6.74,10.8-10.05.45-.4,1.28-.56,1.94-.56,12.81-.02,25.62-.11,38.45.04,6.37.07,12.63,1.12,18.35,4.21,7.49,4.06,9.63,12.85,4.67,19.39-2.34,3.09-5.62,4.82-9.30,5.87-.67.19-1.32.39-2.01.59,5.74,4.70,11.37,9.31,17.43,14.25-1.14.09-1.73.17-2.32.17-6.48.02-12.96.07-19.43-.05-1.06-.02-2.34-.5-3.14-1.21-3.32-2.93-6.45-6.09-9.77-9.03-.81-.72-2.07-1.28-3.13-1.29-7.68-.12-15.35-.03-23.03-.1-1.56-.02-1.91.57-1.88,1.97.07,3.15.02,6.30.02,9.72h-10.76c-1.62,0-3.25-.13-4.86.03-1.77.17-2.11-.59-2.09-2.18.09-6.13.09-12.26-.02-18.38-.03-1.86.51-2.37,2.38-2.36,15.49.07,30.99.09,46.48-.02,2.33-.02,4.72-.63,6.97-1.31,1.65-.50,2.97-1.74,2.91-3.73-.05-1.93-1.28-3.26-2.94-3.75-2.20-.63-4.53-1.10-6.81-1.11-15.29-.09-30.57-.04-45.85-.04h-2.42c-.22-.36-.44-.72-.65-1.07" />
            <path d="M245.73,12.14c-3.44-5.37-8.82-7.93-14.72-9.49C220.27-.21,209.31-.35,198.32.36c-7.26.48-14.42,1.51-21.08,4.76-10.96,5.35-14.73,18.86-8.12,29.11,2.77,4.28,6.92,6.73,11.58,8.4,8.60,3.09,17.6,3.51,28,3.67,2.35-.11,6.09-.20,9.80-.52,6.53-.57,12.97-1.65,18.96-4.56,10.96-5.34,14.84-18.80,8.27-29.08ZM230.30,28.12c-1.13,2.59-3.23,4.15-5.86,4.73-3.07.69-6.22,1.30-9.36,1.43-7.87.31-15.77.71-23.54-1.08-3.21-.75-6.21-2.14-7.18-5.55-2.11-7.43-.19-13.34,7.87-14.69,5.04-.84,10.19-1.01,15.30-1.49,5.03.46,10.04.64,14.95,1.47,7.60,1.30,10.94,8.07,7.82,15.18Z" />
            <path d="M327.52,27.91c2.91-8.53,5.74-16.69,8.43-24.90.56-1.71,1.37-2.23,3.12-2.20,4.84.12,9.68.04,14.88.04-1.47,4-2.80,7.68-4.16,11.35-3.30,8.84-6.68,17.64-9.85,26.51-1.50,4.18-4.10,6.82-8.56,7.40-4.66.59-8.71-.57-11.56-4.55-5.67-7.95-11.27-15.97-16.91-23.96-.32-.45-.63-.91-1.08-1.54-.43.49-.81.86-1.11,1.27-5.58,7.95-11.12,15.93-16.75,23.84-3.35,4.72-9,6.35-14.41,4.28-2.55-.97-4.39-2.69-5.36-5.32-4.53-12.41-9.10-24.82-13.65-37.23-.19-.52-.30-1.07-.52-1.89.79-.05,1.44-.14,2.10-.15,4.43-.02,8.87.08,13.30-.05,1.67-.05,2.30.59,2.78,2.09,2.60,8.03,5.31,16.02,7.99,24.03.07.19.21.35.51.82.48-.64.87-1.14,1.24-1.66,4.64-6.96,9.67-13.72,13.81-20.96,3.87-6.78,16.91-6.76,20.86.23,4.11,7.28,9.12,14.04,13.74,21.02.31.46.66.89,1.15,1.54" />
            <path d="M425.77,34.50c-3.39,3.46-6.75,6.96-10.20,10.36-.47.47-1.40.63-2.12.63-16.98.03-33.95.02-50.92.04-1.15,0-2.04,0-2.03-1.61.05-14.08.05-28.16.08-42.25,0-.13.06-.27.14-.61h65.06c-.96,1.04-1.72,1.90-2.51,2.72-2.41,2.47-4.75,5.01-7.28,7.34-.82.77-2.17,1.35-3.28,1.37-10.71.10-21.41.11-32.11,0-2.17-.02-2.36.92-2.39,2.65-.03,1.85.41,2.58,2.46,2.56,13.17-.09,26.33-.05,39.50-.04.73,0,1.47.07,2.22.10.13.22.26.45.40.67-3.19,3.05-6.34,6.14-9.61,9.10-.51.47-1.58.45-2.39.45-10.01.03-20,.08-30-.02-2.11-.02-2.81.69-2.55,2.66.06.41.06.84.02,1.26-.16,1.51.37,2.27,2.01,2.08.91-.10,1.83-.02,2.74-.02h42.59c.06.17.11.35.17.53" />
            <path d="M427.65,45.37c4.21-4.71,8.06-9,11.90-13.29,7.76-8.65,15.58-17.22,23.24-25.96,4.84-5.53,10.66-7.45,17.60-5.14,2.04.68,4.10,2.04,5.55,3.65,10.81,12.12,21.48,24.40,32.19,36.62,1.10,1.25,2.17,2.52,3.46,4.02-.73.12-1.11.24-1.49.25-5.91,0-11.83.06-17.74-.05-.91-.02-2.18-.53-2.64-1.24-2.90-4.52-6.89-5.69-12.15-5.42-8.71.45-17.46.12-26.19.12-.82,0-1.63-.07-2.96-.12,3.61-3.92,6.84-7.51,10.18-10.99.39-.41,1.29-.45,1.95-.46,3.81-.04,7.61-.02,11.41-.03.67,0,1.34-.07,2.46-.15-3.24-3.79-6.19-7.25-9.36-10.98-.63.58-1.25,1.05-1.76,1.63-7.76,8.65-15.51,17.29-23.21,25.98-1.06,1.19-2.13,1.80-3.78,1.76-5.42-.11-10.85-.04-16.26-.05-.61,0-1.22-.07-2.38-.15" />
            <path d="M545.23,45.29h-17.46c-.07-.63-.18-1.24-.18-1.85,0-6.20.06-12.39-.04-18.59-.03-1.90.64-2.33,2.46-2.32,15.55.07,31.10.09,46.67-.02,2.33-.02,4.71-.68,6.96-1.37,1.61-.49,2.70-1.79,2.67-3.67-.03-1.85-1.10-3.19-2.70-3.68-2.12-.64-4.38-1.17-6.58-1.18-15.49-.10-30.97-.06-46.46-.06h-2.89c1.17-1.29,1.88-2.12,2.63-2.89,2.46-2.52,4.87-5.09,7.43-7.50.72-.68,1.92-1.25,2.90-1.25,12.53-.08,25.06-.13,37.58-.02,6.45.06,12.78.99,18.60,4.04,5.04,2.63,8.01,6.62,7.67,12.51-.33,5.84-3.79,9.50-8.86,11.83-1.57.73-3.28,1.16-4.97,1.76,5.70,4.64,11.32,9.22,17.33,14.13-1,.12-1.52.24-2.02.24-6.62.02-13.24.06-19.85-.04-1-.02-2.18-.52-2.93-1.19-3.37-2.98-6.57-6.16-9.94-9.15-.76-.68-1.94-1.20-2.94-1.21-7.67-.10-15.35,0-23.02-.09-1.74-.02-2.14.63-2.09,2.21.09,3.08.03,6.16.03,9.35" />
          </svg>

          {/* Category Navigation with Dropdown - Optimized for Mobile */}
          <div className="w-full flex justify-center px-1 mt-[7px] mb-[132px] mx-auto">
            <div className="scale-[0.7] sm:scale-100 origin-center">
              <DropdownNavigation />
            </div>
          </div>

          {/* Since 1990 Subtext */}
          <div
            className={`transition-all duration-1000 ease-out mx-auto ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm sm:text-lg font-light text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.25em] text-center">
              Since 2003
            </p>
          </div>

          {/* Our Story Button */}
          <div
            className={`transition-all duration-1000 ease-out mt-5 mx-auto ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={() => {
                const story = document.getElementById("our-story-section")
                if (story) story.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-block px-4 py-3 text-sm sm:text-lg font-light text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:text-gray-700 transition-colors cursor-pointer"
            >
              {"CONTACT"}
            </button>
          </div>

          {/* Gallery Button */}
          <div
            className={`transition-all duration-1000 ease-out mt-3 mx-auto ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={() => {
                window.location.href = "/gallery"
              }}
              className="inline-block px-4 py-3 text-sm sm:text-lg font-light text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:text-gray-700 transition-colors cursor-pointer"
            >
              Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Our Story Content Section - New Modern Layout */}
      <div id="our-story-section" className="pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32 bg-white my-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start my-0 mx-[0] px-0 py-[0]">
            {/* Left Column - About Us Title and Contact */}
            <div className="space-y-12">
              <div>
                <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                  ABOUT
                  <br />
                  US
                </h2>
                <div className="mt-8"></div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 pt-8">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:sales@prowear.com.au?subject=Enquiry%20from%20PROWEAR%20website"
                    className="text-lg sm:text-xl text-gray-700 hover:text-black transition-colors duration-300"
                    aria-label="Email sales at prowear dot com dot au"
                  >
                    sales@prowear.com.au
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.663.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <a
                    href="https://www.instagram.com/proweargroup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl text-gray-700 hover:text-black transition-colors duration-300 underline-offset-4"
                    aria-label="Open @proweargroup on Instagram"
                  >
                    @proweargroup on socials
                  </a>
                </div>
              </div>

              {/* Product Image */}
              <div className="pt-8 flex justify-center flex-col"></div>
            </div>

            {/* Right Column - Services List */}
            <div className="space-y-8 lg:pt-16 my-[-56px]">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService("custom-clothing")}
                  >
                    <h3 className="text-lg sm:text-xl font-medium text-black">Custom Clothing Supply</h3>
                    <span
                      className="text-2xl text-gray-400 transition-transform duration-200"
                      style={{
                        transform: expandedService === "custom-clothing" ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                  {expandedService === "custom-clothing" && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-base text-gray-600 leading-relaxed">
                        Premium, tailored apparel solutions designed to meet your brand's exact specifications.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService("printing-embroidery")}
                  >
                    <h3 className="text-lg sm:text-xl font-medium text-black">In-House Printing & Embroidery</h3>
                    <span
                      className="text-2xl text-gray-400 transition-transform duration-200"
                      style={{
                        transform: expandedService === "printing-embroidery" ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                  {expandedService === "printing-embroidery" && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-base text-gray-600 leading-relaxed">
                        Fast, high-quality decoration services with complete quality control under one roof. Located in
                        Keilor east and Lancefield.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService("stock-label")}
                  >
                    <h3 className="text-lg sm:text-xl font-medium text-black">Stock Label Solutions</h3>
                    <span
                      className="text-2xl text-gray-400 transition-transform duration-200"
                      style={{
                        transform: expandedService === "stock-label" ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                  {expandedService === "stock-label" && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-base text-gray-600 leading-relaxed">
                        Ready-to-go premium styles at wholesale pricing, perfect for retailers needing immediate stock
                        solutions.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService("warehousing")}
                  >
                    <h3 className="text-lg sm:text-xl font-medium text-black">Warehousing Services</h3>
                    <span
                      className="text-2xl text-gray-400 transition-transform duration-200"
                      style={{
                        transform: expandedService === "warehousing" ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                  {expandedService === "warehousing" && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-base text-gray-600 leading-relaxed">
                        Secure storage and inventory management solutions to streamline your supply chain operations.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService("online-ordering")}
                  >
                    <h3 className="text-lg sm:text-xl font-medium text-black">Online Ordering Platforms</h3>
                    <span
                      className="text-2xl text-gray-400 transition-transform duration-200"
                      style={{
                        transform: expandedService === "online-ordering" ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                  {expandedService === "online-ordering" && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-base text-gray-600 leading-relaxed">
                        {
                          "Easy-to-use portals we can create for your brand, enabling seamless ordering, tracking, and reordering."
                        }
                      </p>
                    </div>
                  )}
                </div>

                <div className="pb-6"></div>
              </div>
            </div>
          </div>

          {/* Full-width Description Text */}
          <div className="mt-16 lg:mt-24">
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Prowear is a fully integrated custom clothing supplier with a deep understanding of fabrics and garment
                construction. Our heritage has been shaped by working on major events, instilling a discipline for
                achieving deadlines without compromising on quality.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                To deliver quickly and consistently, we operate in-house printing and embroidery facilities, enabling
                multiple branding capabilities under one roof. We also offer our own stock label, providing premium
                styles at wholesale pricing that are ideal for retailers needing to cover stock gaps.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                For businesses, we provide warehousing services and online ordering platforms, making workforce
                procurement simple and efficient.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Our expertise is tailored to the needs of industry-specific markets, including events, rural, surf and
                ski, hospitality, and sports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div
        id="trusted-by-section"
        className="py-15 sm:py-20 md:py-25 mt-15 sm:mt-20 md:mt-30 border-t border-gray-200 bg-white"
      >
        <div className="w-full px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-5">
              {"Organisations we have worked with"}
            </h2>
          </div>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll items-center gap-12 sm:gap-20 md:gap-32 py-2">
              {/* First set of logos */}
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(2).png"
                  alt="Giant"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(2).png"
                  alt="mitchdwd - Distinctly Australian"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(2).png"
                  alt="Pancare Foundation"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 bg-black flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(1).png"
                  alt="Bicycle Superstore"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/south-west-tafe-logo.png"
                  alt="South West TAFE"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/melbourne-grammar-school-logo.png"
                  alt="Melbourne Grammar School"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/bounce-inc-new-logo.png"
                  alt="Bounce Inc - Free The Demolition Revolution"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/athletics-australia-logo.png"
                  alt="Athletics Australia"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/royal-south-yarra-logo.png"
                  alt="Royal South Yarra Lawn Tennis Club"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/snow-monkey-logo.svg"
                  alt="Snow Monkey"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/combologo.jpg%281%29%281%29(1).jpeg"
                  alt="Lorne - Pier to Pub, Mountain to Surf"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(2).png"
                  alt="Giant"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(2).png"
                  alt="mitchdwd - Distinctly Australian"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(2).png"
                  alt="Pancare Foundation"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 bg-black flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/image%281%29%281%29(1).png"
                  alt="Bicycle Superstore"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/south-west-tafe-logo.png"
                  alt="South West TAFE"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/melbourne-grammar-school-logo.png"
                  alt="Melbourne Grammar School"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/bounce-inc-new-logo.png"
                  alt="Bounce Inc - Free The Demolition Revolution"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/athletics-australia-logo.png"
                  alt="Athletics Australia"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/royal-south-yarra-logo.png"
                  alt="Royal South Yarra Lawn Tennis Club"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/snow-monkey-logo.svg"
                  alt="Snow Monkey"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-shrink-0 w-40 h-20 sm:w-60 sm:h-30 md:w-80 md:h-40 flex items-center justify-center rounded-lg">
                <img
                  src="/images/design-mode/combologo.jpg%281%29%281%29(1).jpeg"
                  alt="Lorne - Pier to Pub, Mountain to Surf"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END Trusted By Section */}
    </div>
  )
}
