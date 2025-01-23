import Hero from "../app/components/Hero"
import FeatureCard from "../app/components/FeatureCard"
import { Mail, Lock, Code, } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Email",
      description: "4GB of free email storage and a synced calendar.",
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
      title: "Repo Hosting",
      description: "Host your code repositories on our Gitea instance.",
      link: "https://git.pontusmail.org/",
      icon: Code,
    },
  ]

  return (
    <main className="min-h-screen">
      <Hero />
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white text-center mb-12">Services</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

