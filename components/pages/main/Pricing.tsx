"use client"

import type React from "react"
import { Check, ChevronRight, Clock, XCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "motion/react"

interface PricingFeatures {
  everything: string[]
  storage: string[]
}

interface FeatureItemProps {
  children: React.ReactNode
}

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  badge?: string
  buttonText?: string
  buttonIcon?: React.ReactNode
  isComingSoon?: boolean
  className?: string
  everything?: boolean
}

const cardVariants = {
  initial: {
    transform: "scale(1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      layout: false
    }
  },
  hover: {
    transform: "scale(1.02)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      layout: false
    }
  }
} as const

const textVariants = {
  initial: {
    color: "inherit",
    transition: { duration: 0.2 }
  },
  hover: {
    color: "inherit",
    transition: { duration: 0.2 }
  }
} as const

const features: PricingFeatures = {
  everything: [
    "Full access to all LibreCloud services",
    "Priority support via Email and Telegram",
    "Open-source services with no vendor lock-in",
    "Unmetered storage (subject to our fair-use policy)",
    "Custom service deployment and management (by request)",
    "Controls over your data, regardless of your country or region",
    "User-friendly, open-source dashboard for managing your entire account",
  ],
  storage: [
    "Clone/erase your entire disk at any time",
    "Zero additional fees for all storage providers",
    "Custom service deployment and management (by request)",
    "Manage your storage server from our easy-to-use dashboard",
    "Control over your data's physical location and security standards",
  ],
}

const FeatureItem: React.FC<FeatureItemProps> = ({ children }) => (
  <div className="flex items-start space-x-2 mb-4">
    <div className="flex-shrink-0 flex items-center justify-center">
      <Check className="h-5 w-5 text-primary" />
    </div>
    <motion.span
      initial="initial"
      whileHover="hover"
      variants={textVariants}
      className="text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300"
    >
      {children}
    </motion.span>
  </div>
)

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  badge,
  buttonText,
  buttonIcon,
  isComingSoon,
  className,
  everything = false,
}) => (
  <motion.div
    className={`relative h-full ${everything ? "col-span-2" : ""}`}
    initial="initial"
    whileHover="hover"
    variants={cardVariants}
    style={{ 
      willChange: "transform",
      transformStyle: "preserve-3d"
    }}
  >
    <div
      className={`relative h-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground hover:bg-accent/5 transition-colors duration-300 group ${className}`}
    >
      <div className={`flex ${everything ? "divide-x divide-border" : ""}`}>
        <div className={`p-6 ${everything ? "w-1/2" : "w-full"}`}>
          <div className="mb-4 flex items-center justify-between">
            <motion.h3 
              variants={textVariants}
              className="text-2xl font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-300"
            >
              {title}
            </motion.h3>
            {badge && (
              <div>
                <Badge variant="outline" className="text-xs font-medium bg-background/50 text-foreground/90">
                  {badge}
                </Badge>
              </div>
            )}
          </div>
          <div>
            {title !== "Everything" ? (
              <motion.span 
                variants={textVariants}
                className="text-sm text-muted-foreground block mb-1 group-hover:text-muted-foreground/90 transition-colors duration-300"
              >
                Starting at
              </motion.span>
            ) : (
              <motion.span 
                variants={textVariants}
                className="text-sm text-muted-foreground italic block mb-1 group-hover:text-muted-foreground/90 transition-colors duration-300"
              >
                Always
              </motion.span>
            )}
            <motion.span 
              variants={textVariants}
              className="text-6xl font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-300"
            >
              {price}
            </motion.span>
            <motion.span 
              variants={textVariants}
              className="text-muted-foreground ml-2 group-hover:text-muted-foreground/90 transition-colors duration-300"
            >
              {period}
            </motion.span>
          </div>
          <motion.p 
            variants={textVariants}
            className="text-sm text-muted-foreground mt-4 mb-6 group-hover:text-muted-foreground/90 transition-colors duration-300"
          >
            {description}
          </motion.p>
          {isComingSoon ? (
            <Button className="w-full" size="lg" variant="outline" disabled>
              <Clock /> Coming Soon
            </Button>
          ) : buttonText ? (
            process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true" ? (
              <Link href="/account/login" className="block">
                <Button className="w-full group cursor-pointer" size="lg">
                  {buttonText}
                  {buttonIcon}
                </Button>
              </Link>
            ) : (
              <Button className="w-full" size="lg" variant="outline" disabled>
                <XCircle className="h-5 w-5" />
                Registration Closed
              </Button>
            )
          ) : null}
        </div>
        {everything && (
          <div className="w-1/2 p-6">
            <div className="h-full flex flex-col space-y-4 text-sm">
              <div className="space-y-2">
                <motion.p 
                  variants={textVariants}
                  className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300"
                >
                  Your LibreCloud account gets you access to all of our hosted services, plus input on what we build next. All account limits are flexible and can be increased at any time.
                </motion.p>
              </div>
              <motion.p 
                variants={textVariants}
                className="text-foreground group-hover:text-foreground/90 transition-colors duration-300"
              >
                We do our best to balance security, privacy, uptime, and service availability, but we&apos;re not perfect. We encourage you to submit any kind of feedback, issues, or requests you have; we are here to listen and help.
              </motion.p>
              <motion.p 
                variants={textVariants}
                className="text-foreground group-hover:text-foreground/90 transition-colors duration-300"
              >
                <span>Registrations will likely reopen to the public <span className="font-bold">mid-June or sooner</span>.</span>
              </motion.p>
            </div>
          </div>
        )}
      </div>
      <Separator className="bg-border" />
      <div className="p-6 space-y-4">
        <motion.h4 
          variants={textVariants}
          className="text-sm font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-300"
        >
          What&#39;s included:
        </motion.h4>
        <div className="space-y-1">
          {features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

export default function Pricing(): React.ReactElement {
  return (
    <section id="pricing" className="pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Pricing You&#39;ll Love</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing with zero additional fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Everything"
            price="$0.00"
            period="/mo"
            description="All the services we offer, completely free."
            features={features.everything}
            badge="Most Popular"
            buttonText="Get Started"
            buttonIcon={<ChevronRight className="h-4 w-4" />}
            everything={true}
          />

          <PricingCard
            title="Storage"
            price="$0.117"
            period="/GB"
            description="Flexible storage options with no markup."
            features={features.storage}
            isComingSoon
          />
        </div>
      </div>
    </section>
  )
}

