import { RiOpenSourceFill } from "react-icons/ri"
import { ArrowUp } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-4 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center mt-8 md:mt-0 md:order-1">
              <RiOpenSourceFill className="text-muted-foreground mr-1" />
              <Link
                href="https://git.pontusmail.org/librecloud/web"
                className="text-muted-foreground hover:text-foreground transition-all"
              >
                Open Source & Public Domain
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-6 md:order-2">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-all"
              >
                <ArrowUp />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}