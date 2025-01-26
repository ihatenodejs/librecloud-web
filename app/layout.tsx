import "./globals.css"
import type { Metadata } from "next"
import Head from "next/head"
import { Inter } from "next/font/google"
import Navbar from "../app/components/Navbar"
import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LibreCloud",
  description: "Secure and private cloud services including email, password management, and code hosting.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{`${metadata.title}`}</title>
        <meta name="description" content={metadata.description ?? ''} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

