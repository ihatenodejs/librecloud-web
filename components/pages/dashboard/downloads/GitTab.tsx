import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import {ArrowDownToLine, BadgeDollarSign, HeartHandshake} from "lucide-react";

export const GitTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Mobile Clients</CardTitle>
        <CardDescription>Manage your Git account from your mobile device!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://gitnex.com/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">GitNex</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Desktop Clients</CardTitle>
        <CardDescription>Use the full suite of Git tools from the command line!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://git-scm.com/downloads/linux" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Git for Linux (CLI)</span>
          </li>
          <li className="mb-2">
            <Link href="https://git-scm.com/downloads/win" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Git for Windows (CLI)</span>
          </li>
          <li className="mb-2">
            <Link href="https://git-scm.com/downloads/mac" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Git for Mac (CLI)</span>
          </li>
          <li className="mb-2">
            <Link href="https://www.gitkraken.com/git-client" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <BadgeDollarSign className="inline-block w-4 h-4 mr-2 -mt-1 text-orange-400" />
            <span className="font-semibold">GitKraken Desktop (GUI)</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

