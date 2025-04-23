import Navbar from "@/components/pages/main/Navbar"
import Footer from "@/components/pages/main/Footer"
import { Scale } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Legal() {
  return (
    <div className="min-h-screen dark:bg-linear-to-b dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <main>
        <div className="pt-4 lg:pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Legal
              </h1>
            </div>
            <h3 className="text-2xl text-muted-foreground my-4">
              Transparency is an important part of LibreCloud.
            </h3>
            <Separator className="my-4" />
            <div className="my-8">
              <h2 className="text-3xl font-bold">Documents</h2>
              <p className="my-2">
                Holding an account on LibreCloud means you&apos;ve agreed to the following:
              </p>
              <ul className="list-disc list-inside">
                <li className="mb-1">
                  <Link href="/legal/privacy" className="underline">Privacy Policy</Link>
                </li>
                <li className="mb-1">
                  <Link href="/legal/terms" className="underline">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div className="my-8">
              <h2 className="text-3xl font-bold">DMCA</h2>
              <p className="my-2">
                LibreCloud is not liable for any content hosted on the service. If you believe content hosted on LibreCloud infringes your copyright, please contact us at <Link href="mailto:support@librecloud.cc" className="underline">support@librecloud.cc</Link>.
              </p>
            </div>
            <div className="my-8">
              <h2 className="text-3xl font-bold">Contact</h2>
              <p className="my-2">
                If you have any questions or concerns about LibreCloud, please contact us at <Link href="mailto:support@librecloud.cc" className="underline">support@librecloud.cc</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}