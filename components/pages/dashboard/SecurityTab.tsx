import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react";

export const SecurityTab = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card>
        {/* TODO: Implement security checks */}
        <CardHeader>
          <CardTitle>Security Check</CardTitle>
          <CardDescription>Evaluate the security of your account with a simple check!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-6">Automatic security scans will be arriving shortly!</p>
          <Button className="w-full" disabled>
            <ShieldCheck className="h-4 w-4" /> Run Security Scan
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
          <CardDescription>Steps you can take to improve your account&apos;s security</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enable Two-Factor Authentication</li>
            <li>Use a strong and unique password</li>
            <li>Run security checks often (just in case)</li>
            <li>Always double-check the URL (librecloud.cc only!)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

