import Link from "next/link"
import { Mail, Key, ExternalLink } from "lucide-react"
import { SiGitea, SiAuthentik, SiNextcloud, SiSearxng } from "react-icons/si";
import { Card, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const ServicesTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Webmail
        </CardTitle>
        <CardDescription className="pt-4">Send, read, and manage your email account from a web browser! Powered by Roundcube and LibreCloud Mail.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <Link href="https://mail.librecloud.cc/" target="_blank">
            Open App
          </Link>
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SiGitea className="mr-2 h-4 w-4" />
          Git
        </CardTitle>
        <CardDescription className="pt-4">Host unlimited repositories and run Actions on our Git server, powered by Gitea.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <Link href="https://git.pontusmail.org/" target="_blank">
            Open App
          </Link>
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-4 w-4" />
          Pass
        </CardTitle>
        <CardDescription className="pt-4">Securely store your passwords, notes, and 2FA codes with Vaultwarden. Data is encrypted at rest.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <Link href="https://pass.librecloud.cc/" target="_blank">
            Open App
          </Link>
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SiAuthentik className="mr-2 h-4 w-4" />
          Authentik
        </CardTitle>
        <CardDescription className="pt-4">Manage your single-sign-on account for all LibreCloud services.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <Link href="https://auth.librecloud.cc/" target="_blank">
            Open App
          </Link>
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SiNextcloud className="mr-2 h-4 w-4" />
          Files
        </CardTitle>
        <CardDescription className="pt-4">Store, share, edit, and synchronize files with Nextcloud.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <Link href="https://files.librecloud.cc/" target="_blank">
            Open App
          </Link>
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SiSearxng className="mr-2 h-4 w-4" />
          Search
        </CardTitle>
        <CardDescription className="pt-4">Search the web privately with our SearXNG instance.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <Link href="https://search.librecloud.cc/" target="_blank">
            Open App
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
)

