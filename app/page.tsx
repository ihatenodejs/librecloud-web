import Hero from "@/components/pages/main/Hero"
import FeatureCard from "@/components/pages/main/FeatureCard"
import { Mail, Lock, Disc3, Headset } from "lucide-react"
import { SiGitea, SiAuthentik } from "react-icons/si";
import Navbar from "@/components/pages/main/Navbar"
import PoweredBySection from "@/components/pages/main/PoweredBySection"
import Pricing from "@/components/pages/main/Pricing"

export default function Home() {
  const features = [
    {
      title: "Email",
      description: "Free email service with webmail and antispam, powered by a custom docker-mailserver setup.",
      icon: Mail,
    },
    {
      title: "Password Manager",
      description: "Securely store and manage your passwords across devices with Vaultwarden.",
      icon: Lock,
    },
    {
      title: "Git",
      description: "Host your repositories and run actions free of charge on our Gitea instance.",
      icon: SiGitea,
    },
    {
      title: "Authentik",
      description: "A secure single-sign-on service for easy login to your other services.",
      icon: SiAuthentik,
    },
    {
      title: "Music",
      description: "Coming soon. Host your music on our community server and stream it everywhere",
      icon: Disc3,
    },
    {
      title: "Support",
      description: "Administrators are standing by most of the day via our various support channels.",
      icon: Headset,
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900">
      <Navbar />
      <main>
        <Hero />
        <section id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-white">Our Services</h2>
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
    </div>
  )
}

