import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ElementType
}

/* TODO: I plan to add a better animation in the future, hover effects are not
         good here, in my opinion. */

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="bg-background border-accent transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="h-6 w-6 mr-2 text-blue-400" />
          <span className="text-xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default FeatureCard

