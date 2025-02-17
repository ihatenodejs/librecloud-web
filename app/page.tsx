import Hero from "@/components/pages/main/Hero"
import FeatureCard from "@/components/pages/main/FeatureCard"
import { Mail, Lock, Disc3 } from "lucide-react"
import { SiGitea, SiAuthentik } from "react-icons/si";
import Navbar from "@/components/pages/main/Navbar"

export default function Home() {
  const features = [
    {
      title: "Email",
      description: "Free email service with webmail and antispam, powered by a custom docker-mailserver setup.",
      link: "https://pontusmail.org/",
      icon: Mail,
    },
    {
      title: "Password Manager",
      description: "Securely store and manage your passwords across devices with Vaultwarden.",
      link: "https://vaultwarden.p0ntus.com/",
      icon: Lock,
    },
    {
      title: "Git",
      description: "Host your repositories and run actions free of charge on our Gitea instance.",
      link: "https://git.pontusmail.org/",
      icon: SiGitea,
    },
    {
      title: "Authentik",
      description: "A secure single-sign-on service for easy login to your other services.",
      link: "https://git.pontusmail.org/",
      icon: SiAuthentik,
    },
    {
      title: "Music",
      description: "Coming soon. Host your music on our community server and stream it everywhere",
      link: "https://git.pontusmail.org/",
      icon: Disc3,
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900">
      <Navbar />
      <main>
        <Hero />
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-white">Our Services</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

