"use client"

import type React from "react"
import { useState } from "react"
import { Check, ChevronRight, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = {
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
      "Use the latest models such as Anthropic's Claude 3.7 Sonnet and OpenAI's o3-mini"
    ],
  }

  const FeatureItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-start space-x-2 mb-4">
      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <span className="text-sm text-foreground">{children}</span>
    </div>
  )

  const cardVariants = {
    default: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -8 },
  }

  return (
    <section id="pricing" className="pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Pricing You&#39;ll Love</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing with zero additional fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className={`relative overflow-hidden rounded-xl border bg-slate-200 dark:bg-gray-800 text-card-foreground shadow transition-all duration-300 ${hoveredCard === 0 ? "border-gray-700" : "border-border"} text-background`}
            variants={cardVariants}
            initial="default"
            animate={hoveredCard === 0 ? "hover" : "default"}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold">Everything</h3>
                <Badge variant="outline" className="text-xs font-medium bg-background">
                  Most Popular
                </Badge>
              </div>
              <div className="mb-4">
                <span className="text-6xl font-bold">$0.00</span>
                <span className="text-muted-foreground ml-2">/mo</span>
              </div>
              <p className="text-sm text-secondary-foreground mb-6">
                All the services we offer, completely free.
              </p>
              <Link href="/account/login">
                <Button className="w-full" size="lg">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            {/* TODO: this seperator be improved in the future, i can't find a good color for this */}
            <Separator className="bg-gray-700" />
            <div className="p-6 space-y-4">
              <h4 className="text-sm font-medium">What&#39;s included:</h4>
              <div>
                {features.everything.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`relative overflow-hidden rounded-xl border text-card-foreground shadow transition-all duration-300 ${hoveredCard === 1 ? "border-gray-700" : "border-border"}`}
            variants={cardVariants}
            initial="default"
            animate={hoveredCard === 1 ? "hover" : "default"}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Storage</h3>
              <div className="text-sm text-muted-foreground mb-2">Starting at</div>
              <div className="mb-4">
                <span className="text-6xl font-bold">$0.117</span>
                <span className="text-muted-foreground ml-2">/GB</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Flexible storage options with no markup.</p>
              <Button className="w-full" size="lg" variant="outline" disabled>
                <Clock /> Coming Soon
              </Button>
            </div>
            <Separator />
            <div className="p-6 space-y-4">
              <h4 className="text-sm font-medium">What&#39;s included:</h4>
              <div>
                {features.storage.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Calculator price rounded to nearest dollar and based on ElcroDigital provider
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`relative overflow-hidden rounded-xl border text-card-foreground shadow transition-all duration-300 ${hoveredCard === 2 ? "border-gray-700" : "border-border"}`}
            variants={cardVariants}
            initial="default"
            animate={hoveredCard === 2 ? "hover" : "default"}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Generative AI</h3>
              <div className="text-sm text-muted-foreground mb-2">Starting at</div>
              <div className="mb-4">
                <span className="text-6xl font-bold">$0.00</span>
                <span className="text-muted-foreground ml-2">/M tokens</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Access powerful AI models at the best price.</p>
              <Button className="w-full" size="lg" variant="outline" disabled>
                <Clock /> Coming Soon
              </Button>
            </div>
            <Separator />
            <div className="p-6 space-y-4">
              <h4 className="text-sm font-medium">What&#39;s included:</h4>
              <div>
                {features.ai.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

