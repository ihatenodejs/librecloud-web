import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Server } from "lucide-react"
import { SiCloudflare, SiCloudflarepages, SiCloudflareworkers } from "react-icons/si"
import { TbCloudNetwork } from "react-icons/tb"

export default function Infrastructure() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Infrastructure</CardTitle>
        <CardDescription>
          Our portfolio of servers and services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="flex items-center">
            <Server className="w-4 h-4 mr-1" />
            <span className="font-bold">librecloud.cc</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Location:</span>
            <span className="ml-1">Madison, Wisconsin, USA</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">CPU:</span>
            <span className="ml-1">Intel® Xeon® E5-2680 v4</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">RAM:</span>
            <span className="ml-1">64GB DDR4</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Storage:</span>
            <span className="ml-1">2TB SSD</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Uplink:</span>
            <span className="ml-1">1Gbps</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Provider:</span>
            <span className="ml-1">Felware</span>
          </p>
        </div>
        <div className="mt-4">
          <p className="flex items-center">
            <SiCloudflare className="w-4 h-4 mr-1" />
            <span className="font-bold">Cloudflare</span>
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            <span>Used for DNS and websites which require low latency.</span>
          </p>
          <p className="flex items-center text-sm text-muted-foreground mb-1">
            <TbCloudNetwork className="w-4 h-4 mr-1" />
            <span className="font-bold">DNS</span>
          </p>
          <p className="flex items-center text-sm text-muted-foreground mb-1">
            <SiCloudflareworkers className="w-4 h-4 mr-1" />
            <span className="font-bold">Workers</span>
          </p>
          <p className="flex items-center text-sm text-muted-foreground mb-1">
            <SiCloudflarepages className="w-4 h-4 mr-1" />
            <span className="font-bold">Pages</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}