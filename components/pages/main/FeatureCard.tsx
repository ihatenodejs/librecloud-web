"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import AnimatedIcon from "./AnimatedIcon"

interface FeatureCardProps {
  title: string
  description: string
  iconName: Parameters<typeof AnimatedIcon>[0]["iconName"]
}

const FeatureCard = ({ title, description, iconName }: FeatureCardProps) => {
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
            <AnimatedIcon
              iconName={iconName}
              className="h-6 w-6 mr-2 text-primary group-hover:text-primary/80 transition-colors duration-300"
            />
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

