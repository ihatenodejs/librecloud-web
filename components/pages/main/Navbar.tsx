"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X, Server, Home, User, Rss } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-300 dark:bg-gray-950/70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">LibreCloud</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink href="/" icon={Home}>
                Home
              </NavLink>
              <NavLink href="https://status.librecloud.cc" icon={Rss}>
                Status
              </NavLink>
              <NavLink href="/#services" icon={Server}>
                Services
              </NavLink>
              <NavLink href="/account/login" icon={User}>
                My Account
              </NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" icon={Home}>
              Home
            </MobileNavLink>
            <MobileNavLink href="https://status.librecloud.cc" icon={Rss}>
              Status
            </MobileNavLink>
            <MobileNavLink href="/#services" icon={Server}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/account/login" icon={User}>
              My Account
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

interface NavLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className="flex items-center  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    <Icon className="mr-2 h-5 w-5" /> {children}
  </Link>
)

interface MobileNavLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className="flex items-center  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
  >
    <Icon className="mr-2 h-5 w-5" /> {children}
  </Link>
)

export default Navbar

