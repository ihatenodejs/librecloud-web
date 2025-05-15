import Hero from "@/components/pages/main/Hero"
import FeatureCard from "@/components/pages/main/FeatureCard"
import Navbar from "@/components/pages/main/Navbar"
import Footer from "@/components/pages/main/Footer"
import PoweredBySection from "@/components/pages/main/PoweredBySection"
import Pricing from "@/components/pages/main/Pricing"
import { Mail, Lock, Disc3 } from "lucide-react"
import { SiOwncloud, SiGitea, SiAuthentik } from "react-icons/si"

export default function Home() {
  const features = [
    {
      title: "Email",
      description: "Free email service with webmail and antispam, powered by a custom docker-mailserver setup.",
      icon: <Mail className="h-6 w-6 mr-2" />,
    },
    {
      title: "Password Manager",
      description: "Securely store and manage your passwords across devices with Vaultwarden.",
      icon: <Lock className="h-6 w-6 mr-2" />,
    },
    {
      title: "Git",
      description: "Host your repositories and run actions free of charge on our Gitea instance.",
      icon: <SiGitea className="h-6 w-6 mr-2" />,
    },
    {
      title: "Authentik",
      description: "A secure single-sign-on service for easy login to your other services.",
      icon: <SiAuthentik className="h-6 w-6 mr-2" />,
    },
    {
      title: "Music",
      description: "Coming soon. Host your music on our community server and stream it everywhere.",
      icon: <Disc3 className="h-6 w-6 mr-2" />,
    },
    {
      title: "Files",
      description: "Store, share, edit, and synchronize files with our private ownCloud instance.",
      icon: <SiOwncloud className="h-6 w-6 mr-2" />,
    },
  ] as const

  return (
    <div className="min-h-screen dark:bg-linear-to-b dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <main>
        <Hero />
        <section id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-foreground">Our Services</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
        <PoweredBySection />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

