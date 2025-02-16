import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import {ArrowDownToLine, HeartHandshake} from "lucide-react";

export const PassTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Browser Clients</CardTitle>
        <CardDescription>Manage your passwords and secure notes from your browser!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://chromewebstore.google.com/detail/bitwarden-password-manage/nngceckbapebfimnlniiiahkandclblb/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Google Chrome</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://addons.mozilla.org/en-US/firefox/addon/bitwarden-password-manager/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Mozilla Firefox</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://microsoftedge.microsoft.com/addons/detail/bitwarden-password-manage/jbkfoedolllekgbhcbcoahefnbanhhlh/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Microsoft Edge</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://itunes.apple.com/app/bitwarden/id1352778147?browser=safari" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Safari (macOS)</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://addons.opera.com/en/extensions/details/bitwarden-free-password-manager/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Opera</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Mobile Clients</CardTitle>
        <CardDescription>Manage your passwords and secure notes from your mobile device!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="mb-2">
            <Link href="https://play.google.com/store/apps/details?id=com.bitwarden.authenticator&hl=en-US" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Android (Authenticator)</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/bitwarden-authenticator/id6497335175/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">iOS (Authenticator)</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://play.google.com/store/apps/details?id=com.x8bit.bitwarden&hl=en-US" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Android</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://apps.apple.com/us/app/bitwarden-password-manager/id1137397744/" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">iOS</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
        </ul>
      </CardContent>
    </Card>
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Desktop Clients</CardTitle>
        <CardDescription>Manage your passwords and secure notes from your computer!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <span className="font-bold">Linux</span>
          <li className="mt-4 mb-2">
            <Link href="https://bitwarden.com/download/#downloads-desktop" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Package/Archive</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://snapcraft.io/bitwarden" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Snapcraft (Ubuntu)</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-4">
            <Link href="https://flathub.org/apps/com.bitwarden.desktop" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Flathub</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <span className="font-bold">Windows</span>
          <li className="mt-4 mb-2">
            <Link href="https://bitwarden.com/download/#downloads-desktop" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Installer/Package</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-4">
            <Link href="https://www.microsoft.com/store/apps/9PJSDV0VPK04" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Microsoft Store</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <span className="font-bold">macOS</span>
          <li className="mt-4 mb-2">
            <Link href="https://itunes.apple.com/app/bitwarden/id1352778147" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">App Store</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
          <li className="mb-2">
            <Link href="https://bitwarden.com/download/#downloads-desktop" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine className="inline-block w-4 h-4 mr-2 -mt-1" />
            </Link>
            <HeartHandshake className="inline-block w-4 h-4 mr-2 -mt-1" />
            <span className="font-semibold">Installer/Brew</span>
            <span className="ml-4 text-sm text-gray-600">by Bitwarden</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

