"use client"

import type React from "react"
import { Check, ChevronRight, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, HTMLMotionProps } from "framer-motion"

interface PricingFeatures {
  everything: string[]
  storage: string[]
  ai: string[]
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
    "Use anything and everything on LibreCloud",
    "Unlimited Password/Secret Storage with Vaultwarden",
    "4GB of Email Storage",
    "Unlimited Git Repositories with Gitea",
    "Unlimited Fair-Use Actions runs with Gitea",
    "Priority support via Email/Telegram",
  ],
  storage: [
    "ZERO FEES - You pay the price we pay",
    "Through some providers, we offer 24/7 monitoring",
    "Several data storage providers to choose from",
    "Clone/erase your entire disk at any time (coming soon)",
    "Do anything with your extra slice... we'll setup email, services, and more at no additional cost",
  ],
  ai: [
    "Flexible options such as OpenRouter and Cloud VPS",
    "Pay per token or hour at no additional cost from LibreCloud",
    "Use our open-source chat interface with a range of providers",
    "Use the latest models such as Anthropic's Claude 3.7 Sonnet and OpenAI's o3-mini",
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
}) => (
  <motion.div
    className="relative h-full"
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
      <div className="p-6">
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
            <Clock className="mr-2" /> Coming Soon
          </Button>
        ) : buttonText ? (
          <Link href="/account/login" className="block">
            <Button className="w-full group" size="lg">
              {buttonText}
              {buttonIcon}
            </Button>
          </Link>
        ) : null}
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
            buttonIcon={<ChevronRight className="ml-2 h-4 w-4" />}
          />

          <PricingCard
            title="Storage"
            price="$0.117"
            period="/GB"
            description="Flexible storage options with no markup."
            features={features.storage}
            isComingSoon
          />

          <PricingCard
            title="Generative AI"
            price="$0.00"
            period="/M tokens"
            description="Access powerful AI models at the best price."
            features={features.ai}
            isComingSoon
          />
        </div>
      </div>
    </section>
  )
}

