import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  link: string
  icon: LucideIcon
}

const FeatureCard = ({ title, description, link, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-300">{description}</p>
      <a href={link}>
        <Button
          className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign Up
        </Button>
      </a>
    </div>
  )
}

export default FeatureCard

