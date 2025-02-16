import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ElementType
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Icon className="h-6 w-6 mr-2 text-blue-400" />
          <span className="text-xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default FeatureCard

