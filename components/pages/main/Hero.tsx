"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, XCircle } from "lucide-react"
import { ReactTyped } from "react-typed"
import Link from "next/link";

const Hero = () => {
  const phrases = ["everyone", "developers", "students", "non-profits", "teachers", "workers", "friends"]

  return (
    <div className="pt-20 pb-30 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Free Cloud Services</span>
            <span className="block mt-2">
              for <ReactTyped strings={phrases} typeSpeed={60} backSpeed={50} loop className="text-blue-400" />
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-xl text-muted-foreground sm:max-w-3xl">
            Experience FOSS at its best with LibreCloud, a free service provider built with everyone in mind.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow-sm">
              {process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true" ? (
                <Link href="/account/login">
                  <Button className="py-6 px-8 cursor-pointer">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button className="py-6 px-8 cursor-not-allowed" disabled>
                  <XCircle className="mr-2 h-5 w-5" />
                  Registration Closed
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

