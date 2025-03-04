import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Headset
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
          href="mailto:support@librecloud.cc"
        >
          <Button
            className="w-full mb-2"
          >
            <Headset />
            Support
          </Button>
        </Link>
        <Link
          href="https://mail.librecloud.cc"
        >
          <Button
            className="w-full mb-2"
          >
            <Mail />
            Webmail
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
