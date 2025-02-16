import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine, BadgeDollarSign, HeartHandshake } from "lucide-react"
import { TfiLinux, TfiMicrosoftAlt, TfiAndroid, TfiApple } from "react-icons/tfi";

export const HomeTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          In order to make it easy to access and use our services, we have compiled resources which may help you with
          using LibreCloud services.
        </p>
        <p className="text-sm mt-4">
          Click any of the tabs to be taken to a category of your choosing. We have resources for:
        </p>
        <div className="flex justify-center items-center gap-4 text-muted-foreground my-6">
          <TfiLinux size={24} />
          <TfiMicrosoftAlt size={24} />
          <TfiAndroid size={24} />
          <TfiApple size={24} />
        </div>
        <p className="text-sm">
          All downloads are <i>not</i> hosted by LibreCloud and are from their original source only.
        </p>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Icon Key</CardTitle>
        <CardDescription>While browsing downloads, you might want to know what each icon means.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
          <span>
            Download <span className="text-xs text-muted-foreground ml-2">(click to download)</span>
          </span>
        </div>
        <div className="mt-2">
          <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
          <span>Open Source</span>
        </div>
        <div className="mt-2">
          <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-green-400" />
          <span>Completely free</span>
        </div>
        <div className="mt-2">
          <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
          <span>Offers free tier (restricted)</span>
        </div>
        <div className="mt-2">
          <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-red-400" />
          <span>Paid application</span>
        </div>
      </CardContent>
    </Card>
  </div>
)

