"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import { Disc3 } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.01, 
        y: -2,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }
      }}
    >
      <Card className="bg-card text-card-foreground border-border hover:bg-accent/5 relative group transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            {title === "Music" ? (
              <Disc3 className="h-6 w-6 mr-2 animate-spin" />
            ) : ( icon )}
            <span className="text-xl text-foreground group-hover:text-foreground/90 transition-colors duration-300">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeatureCard

