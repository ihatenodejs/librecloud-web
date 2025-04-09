import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Headset,
  Heart
} from "lucide-react"
import Link from "next/link"

export const QuickLinks = () => {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href="/account/dashboard/support"
        >
          <Button
            variant="secondary"
            className="w-full mb-2 cursor-pointer"
          >
            <Headset />
            Support
          </Button>
        </Link>
        <Link
          href="https://mail.librecloud.cc"
        >
          <Button
            variant="secondary"
            className="w-full mb-2 cursor-pointer"
          >
            <Mail />
            Webmail
          </Button>
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_DONATE_URL || "https://donate.stripe.com/6oE8yxaPk6yXbpS145"}
        >
          <Button
            variant="secondary"
            className="w-full mb-2 cursor-pointer"
          >
            <Heart />
            Donate
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
