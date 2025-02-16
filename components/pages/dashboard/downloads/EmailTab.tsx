import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import {ArrowDownToLine, BadgeDollarSign, HeartHandshake} from "lucide-react";

export const EmailTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Linux Email Clients</CardTitle>
        <CardDescription>Applications which will allow you to view, send, and manage your email which are supported on Linux.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://www.thunderbird.net/en-US/thunderbird/all/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Thunderbird</span>
            <span className="ml-4 text-sm text-gray-600">by Mozilla</span>
          </li>
          <li className="mb-2">
            <Link href="https://wiki.gnome.org/Apps/Evolution" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Evolution</span>
              <span className="ml-4 text-sm text-gray-600">by GNOME</span>
          </li>
          <li className="mb-2">
            <Link href="https://wiki.gnome.org/Apps/Geary" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Geary</span>
            <span className="ml-4 text-sm text-gray-600">by GNOME</span>
          </li>
          <li className="mb-2">
            <Link href="https://www.claws-mail.org/downloads.php" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Claws Mail</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Windows Email Clients</CardTitle>
        <CardDescription>Applications which will allow you to view, send, and manage your email which are supported on Windows.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://www.thunderbird.net/en-US/thunderbird/all/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Thunderbird</span>
            <span className="ml-4 text-sm text-gray-600">by Mozilla</span>
          </li>
          <li className="mb-2">
            <Link href="https://www.microsoft.com/en-us/microsoft-365/outlook/outlook-for-windows" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">Outlook</span>
            <span className="ml-4 text-sm text-gray-600">by Microsoft</span>
          </li>
          <li className="mb-2">
            <Link href="https://www.claws-mail.org/win32/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Claws Mail</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Android Email Clients</CardTitle>
        <CardDescription>Applications which will allow you to view, send, and manage your email which are supported on Android.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://www.thunderbird.net/en-US/mobile/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Thunderbird</span>
            <span className="ml-4 text-sm text-gray-600">by Mozilla</span>
          </li>
          <li className="mb-2">
            <Link href="https://k9mail.app/download" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">K-9 Mail</span>
            <span className="ml-4 text-sm text-gray-600">by Mozilla</span>
          </li>
          <li className="mb-2">
            <Link href="https://email.faircode.eu/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">FairMail</span>
          </li>
          <li className="mb-2">
            <Link href="https://www.aqua-mail.com/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">Aqua Mail</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>iOS Email Clients</CardTitle>
        <CardDescription>Applications which will allow you to view, send, and manage your email which are supported on iOS.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/mail/id1108187098/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <span className="font-semibold">Apple Mail</span>
            <span className="ml-4 text-sm text-gray-600">by Apple</span>
          </li>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/microsoft-outlook/id951937596" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">Outlook</span>
            <span className="ml-4 text-sm text-gray-600">by Microsoft</span>
          </li>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/spark-mail-ai-email-inbox/id997102246" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">Spark Mail</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>macOS Email Clients</CardTitle>
        <CardDescription>Applications which will allow you to view, send, and manage your email which are supported on macOS.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1 text-red-400" />
            <span className="font-semibold">Apple Mail</span>
            <span className="ml-4 text-sm text-gray-600">by Apple</span>
          </li>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/microsoft-outlook/id985367838" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">Outlook</span>
            <span className="ml-4 text-sm text-gray-600">by Microsoft</span>
          </li>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/spark-mail-ai-email-inbox/id6445813049" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">Spark Mail</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

