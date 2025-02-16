import Link from "next/link"
import { Mail, Key, ExternalLink } from "lucide-react"
import { SiGitea, SiAuthentik } from "react-icons/si";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const ServicesTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {/* TODO: move to component */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Webmail
        </CardTitle>
        <CardDescription className="pt-4">Send, read, and manage your email account from a web browser!</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <ExternalLink className="h-4 w-4" />
          <Link href="https://mail.librecloud.cc/">
            Open App
          </Link>
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SiGitea className="mr-2 h-4 w-4" />
          Git
        </CardTitle>
        <CardDescription className="pt-4">Host your repositories and run Actions on a fair usage policy.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <ExternalLink className="h-4 w-4" />
          <Link href="https://git.pontusmail.org/">
            Open App
          </Link>
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-4 w-4" />
          Pass
        </CardTitle>
        <CardDescription className="pt-4">Securely store your passwords, notes, and 2FA codes with Vaultwarden.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <ExternalLink className="h-4 w-4" />
          <Link href="https://vaultwarden.p0ntus.com/">
            Open App
          </Link>
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SiAuthentik className="mr-2 h-4 w-4" />
          Authentik
        </CardTitle>
        <CardDescription className="pt-4">Manage your single-sign-on account for all LibreCloud services.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <ExternalLink className="h-4 w-4" />
          <Link href="https://auth.librecloud.cc/">
            Open App
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
)

