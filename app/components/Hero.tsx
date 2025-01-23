'use client';

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ReactTyped } from "react-typed"

const Hero = () => {
  const phrases = ["developers", "students", "non-profits", "everyone"]

  return (
    <div className="bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Free Cloud Services</span>
            <span className="block text-blue-500">
              for <ReactTyped
                    strings={phrases}
                    typeSpeed={60}
                    backSpeed={50}
                    loop
                  /> {/* there is probably a better way to format this */}
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience FOSS at its best with LibreCloud, a free service provider built with all kinds of people in mind.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#services">
                <Button className="w-full flex items-center justify-center py-5 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-6 md:text-lg md:px-6">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

