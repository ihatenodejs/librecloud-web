import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircleIcon, XCircleIcon, Loader2, ShieldCheck, Search, Lightbulb } from "lucide-react"
import { useState, useEffect } from "react"
import { SiAuthentik } from "react-icons/si"
import { type SecurityResults } from "@/app/api/users/security/route"

interface CategoryChecks {
  passed: number
  failed: number
  total: number
}

export const SecurityTab = () => {
  const [scanning, setScanning] = useState(false)
  const [scanResults, setScanResults] = useState<SecurityResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [authentikChecks, setAuthentikChecks] = useState<CategoryChecks>({ passed: 0, failed: 0, total: 0 })
  const [overallChecks, setOverallChecks] = useState<CategoryChecks>({ passed: 0, failed: 0, total: 0 })

  const scanAcc = async () => {
    setScanning(true)
    try {
      const res = await fetch("/api/users/security")
      const data = await res.json()
      setScanResults(data)
      setScanning(false)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
      setScanning(false)
    }
  }

  // If password was changed over 3 months ago, this will be true
  const shouldResetPass = scanResults?.authentik?.passwordChangeDate && scanResults?.authentik?.passwordChangeDate < new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)

  // If user has no 2FA methods setup, this will be true
  const insufficient2FA = scanResults?.authentik?.authenticators.length === 0

  useEffect(() => {
    if (scanResults) {
      const authentik: CategoryChecks = {
        passed: 0,
        failed: 0,
        total: 0
      }

      // Password age
      authentik.total++
      if (!shouldResetPass) {
        authentik.passed++
      } else {
        authentik.failed++
      }

      // 2FA
      authentik.total++
      if (!insufficient2FA) {
        authentik.passed++
      } else {
        authentik.failed++
      }

      setAuthentikChecks(authentik)

      setOverallChecks(authentik)
    }
  }, [scanResults, shouldResetPass, insufficient2FA])

  const calculatePercentage = (passed: number, total: number) => {
    if (total === 0) return 0
    return Math.round((passed / total) * 100)
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <span className="text-xl">Account Security Scan</span>
          </CardTitle>
          <CardDescription>Evaluate the security of your account with a simple button click!</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500">
              <div className="flex items-center gap-1 mb-2">
                <AlertCircle className="h-4 w-4" />
                <p className="font-bold">Error</p>
              </div>
              <p className="text-sm">{error}</p>
            </div>
          ) : scanResults ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SiAuthentik size={20} />
                  <h3 className="text-xl">Authentik</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {authentikChecks.passed}/{authentikChecks.total} checks passed
                  </span>
                </div>
              </div>

              {shouldResetPass ? (
                <div className="flex items-center gap-2 mt-2">
                  <XCircleIcon className="h-4 w-4 text-red-500" />
                  <p className="text-sm">Password last changed {"on " + (scanResults?.authentik?.passwordChangeDate ? new Date(scanResults.authentik.passwordChangeDate).toLocaleDateString() : "never")}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Password last changed {"on " + (scanResults?.authentik?.passwordChangeDate ? new Date(scanResults.authentik.passwordChangeDate).toLocaleDateString() : "never")}</p>
                </div>
              )}

              {insufficient2FA ? (
                <div className="flex items-center gap-2 mt-2">
                  <XCircleIcon className="h-4 w-4 text-red-500" />
                  <p className="text-sm">No 2FA methods setup</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  <p className="text-sm"><span className="font-bold">{scanResults?.authentik?.authenticators.length}</span> two-factor authentication methods setup</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Results</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold">
                      {calculatePercentage(overallChecks.passed, overallChecks.total)}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {overallChecks.passed}/{overallChecks.total} checks passed
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {scanning ? (
                <Button className="w-full cursor-pointer" disabled>
                  <Loader2 className="h-4 w-4 animate-spin" /> Scanning...
                </Button>
              ) : (
                <Button className="w-full cursor-pointer" onClick={scanAcc}>
                  <Search className="h-4 w-4" /> Scan my Account
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={18} />
            <span className="text-xl">Recommendations</span>
          </CardTitle>
          <CardDescription>Steps you can take to improve your account&apos;s security</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm">Enable Two-Factor Authentication</li>
            <li className="text-sm">Use a strong and unique password</li>
            <li className="text-sm">Always make sure the URL matches <span className="font-bold">librecloud.cc</span></li>
            <div className="border border-green-400 rounded-md p-1 w-full flex items-center justify-between">
              <span className="text-sm flex items-center">
                <Search size={16} className="mx-1" />
                https://<span className="font-bold text-green-400">librecloud.cc</span>
              </span>
              <CheckCircleIcon size={16} className="text-green-500 mr-1" />
            </div>
            <div className="border border-red-400 rounded-md p-1 w-full flex items-center justify-between">
              <span className="text-sm flex items-center">
                <Search size={16} className="mx-1" />
                https://<span className="font-bold text-red-400">libre-cloud-login.com</span>
              </span>
              <XCircleIcon size={16} className="text-red-500 mr-1" />
            </div>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}