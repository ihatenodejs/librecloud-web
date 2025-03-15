"use client"

import { RiOpenSourceFill } from "react-icons/ri"
import { ArrowUp } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center justify-center sm:justify-start">
            <RiOpenSourceFill className="text-gray-600 dark:text-gray-400 mr-2 text-lg" aria-hidden="true" />
            <Link
              href="https://git.pontusmail.org/librecloud/web"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="View source code"
            >
              Open Source & Public Domain
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-6">
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Privacy Policy
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}