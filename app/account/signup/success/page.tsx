"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Sparkles, Lock, BadgeCheck, CircleArrowRight } from "lucide-react"
import { SiGitea, SiAuthentik } from "react-icons/si"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

const services = [
  {
    title: "Email",
    description: "You now have access to send and receive emails with the email you created at signup.",
    link: "https://mail.librecloud.cc/",
    icon: Mail,
  },
  {
    title: "Pass",
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
]

const WelcomePage = () => {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full h-1/5 sm:h-2/5 md:h-full md:w-2/5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-black/30 via-black/20 to-transparent dark:from-white/30 dark:via-white/20 dark:to-transparent"></div>
        <div
          style={{
            backgroundImage: resolvedTheme === "dark"
              ? "url(/noise-dark.png)"
              : "url(/noise-light.png)",
            opacity: 0.1,
          }}
          className="absolute inset-0"
        />
        <div className="relative z-10 p-8 md:pl-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white text-center md:text-left"
          >
            Welcome to LibreCloud
          </motion.h1>
        </div>
      </div>
      <div className="w-full md:w-3/5 lg:w-4/5 p-4 md:p-8 h-full overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <BadgeCheck className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl md:text-3xl font-semibold my-6 text-center">Your account was created</h2>
          <Separator className="my-8" />
          <h2 className="text-2xl md:text-3xl font-semibold my-6">You&apos;ve unlocked</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <service.icon className="w-5 h-5 mr-2" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                  <Button variant="link" className="mt-2 p-0" asChild>
                    <Link href={service.link}>
                      Explore <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator className="my-8" />
          <h2 className="text-2xl md:text-3xl font-semibold my-6">Pay less, do more</h2>
          <div className="space-y-6">
            <motion.div
              className="bg-card p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold flex items-center mb-3">
                <Sparkles className="w-6 h-6 mr-2" />
                Did You Know?
              </h3>
              <p>
                LibreCloud makes <b>ZERO</b> profit off upgrades, while doing the heavy lifting in the background to ensure a connected experience.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="bg-primary/10 p-6 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-lg font-semibold mb-2">Unmetered Storage</h4>
                <p className="text-sm">
                  Use as much storage as you want, subject only to our fair use policies.
                </p>
              </motion.div>
              <motion.div
                className="bg-primary/10 p-6 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-lg font-semibold mb-2">Account Upgrades</h4>
                <p className="text-sm">
                  Add additional storage or services from our host at no additional fee from LibreCloud.
                </p>
              </motion.div>
            </div>
          </div>
          <Separator className="my-8" />
          <h2 className="text-2xl md:text-3xl font-semibold my-6">Now, we set you free</h2>
          <p>
            Now, it&apos;s your time to explore. All we ask is you use your services in a fair way. Account bans will be enforced for abuse of our services for spamming, scamming, and all that nasty stuff.
          </p>
          <p className="mt-4">
            We live in the &quot;Support&quot; tab on your dashboard, and on Telegram if you need any help. Please be civil and patient, and we&apos;ll do our best to help you out.
          </p>
          <p className="mt-4">
            From here, you can proceed to sign in to your newly created account with Authentik. It will handle all the sign-ins for your account except for Pass (Vaultwarden).
          </p>
          <Link href="/account/login">
            <Button className="mt-8 cursor-pointer"><CircleArrowRight /> Login</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomePage

