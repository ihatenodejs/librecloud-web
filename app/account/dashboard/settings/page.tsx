"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import MyAccount from "@/components/cards/dashboard/Settings/MyAccount"
import { useState, useEffect } from "react"
import { LayoutDashboard, Trash, Loader2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { TbFreeRights } from "react-icons/tb"

export default function Settings() {
  const [settings, setSettings] = useState({
    hidePaidFeatures: false,
  });
  const [loading, setLoading] = useState(false)
  const [deleteOTP, setDeleteOTP] = useState('')
  const [deleteOTPLoading, setDeleteOTPLoading] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const [otpError, setOtpError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [nextcloudError, setNextcloudError] = useState('')
  const [deleteSteps, setDeleteSteps] = useState({
    nextcloud: { status: 'pending', message: 'Pending' },
    database: { status: 'pending', message: 'Pending' }
  })
  const [deleteStep, setDeleteStep] = useState<'initial' | 'otp' | 'confirm'>('initial')
  
  const router = useRouter()
  
  const handleOTPChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    setDeleteOTP(numericValue)
  }

  useEffect(() => {
    let successTimer: NodeJS.Timeout
    if (showSuccess) {
      successTimer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }
    return () => {
      if (successTimer) clearTimeout(successTimer)
    }
  }, [showSuccess])

  useEffect(() => {
    let cooldownTimer: NodeJS.Timeout
    if (cooldownSeconds > 0) {
      cooldownTimer = setInterval(() => {
        setCooldownSeconds(prev => prev - 1)
      }, 1000)
    }
    return () => {
      if (cooldownTimer) clearInterval(cooldownTimer)
    }
  }, [cooldownSeconds])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users/settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        } else {
          console.error('[!] Failed to fetch settings')
        }
      } catch (error) {
        console.error('[!] Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    };

    fetchSettings()
  }, []);

  const updateSetting = async (settingName: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: value
    }))

    try {
      setLoading(true)
      const response = await fetch('/api/users/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          [settingName]: value
        }),
      })

      if (response.ok) {
        const updatedSettings = await response.json()
        setSettings(updatedSettings)
      } else {
        console.error('[!] Failed to update settings')
        setSettings(prev => ({
          ...prev,
          [settingName]: !value
        }))
      }
    } catch (error) {
      console.error('[!] Error updating settings:', error)
      setSettings(prev => ({
        ...prev,
        [settingName]: !value
      }))
    } finally {
      setLoading(false)
      window.location.reload()
    }
  };

  const deleteAccount = async () => {
    setIsDeleting(true)
    setOtpError('')
    setNextcloudError('')
    setDeleteSteps({
      nextcloud: { status: 'pending', message: 'Pending' },
      database: { status: 'pending', message: 'Pending' }
    })
    
    try {
      // 1. Delete Nextcloud account
      const nextcloudResponse = await fetch('/api/users/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: deleteOTP,
          step: 'nextcloud'
        }),
      })

      const nextcloudData = await nextcloudResponse.json()
      
      if (nextcloudData.steps) {
        setDeleteSteps(prev => ({
          ...prev,
          nextcloud: nextcloudData.steps.nextcloud
        }))
      }
      
      if (!nextcloudResponse.ok || nextcloudData.steps?.nextcloud.status === 'error') {
        if (nextcloudData.error === 'Failed to delete user from Nextcloud') {
          setNextcloudError('Failed to delete your Nextcloud account. Please try again or contact support.')
        } else {
          setOtpError(nextcloudData.error || 'Failed to delete Nextcloud account')
        }
        setIsDeleting(false)
        return
      }
      
      const databaseResponse = await fetch('/api/users/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: deleteOTP,
          step: 'database'
        }),
      })

      const databaseData = await databaseResponse.json()
      
      if (databaseData.steps) {
        setDeleteSteps(prev => ({
          ...prev,
          database: databaseData.steps.database
        }))
      }
      
      if (databaseResponse.ok && databaseData.success) {
        setDeleteSteps({
          nextcloud: { status: 'success', message: 'Completed' },
          database: { status: 'success', message: 'Completed' }
        })
        
        setTimeout(() => {
          signOut()
          router.push('/')
        }, 1500)
      } else {
        if (databaseData.error === 'Failed to delete user from database') {
          setOtpError('Failed to delete your account from the database. Please try again or contact support.')
        } else {
          setOtpError(databaseData.error || 'Failed to delete account')
        }
        setIsDeleting(false)
      }
    } catch (error) {
      console.error('[!] Error deleting account:', error)
      setOtpError(error instanceof Error ? error.message : 'Failed to delete account')
      setIsDeleting(false)
    }
  }

  const sendOTP = async () => {
    setDeleteOTPLoading(true)
    setOtpError('')
    try {
      const response = await fetch('/api/users/otp', {
        method: 'GET'
      })
      const data = await response.json()
      
      if (response.ok) {
        console.log(data)
        setShowSuccess(true)
        setCooldownSeconds(60)
      } else {
        if (response.status === 429) {
          setCooldownSeconds(data.remainingCooldown)
          setOtpError(`Please wait ${data.remainingCooldown} seconds before requesting another OTP`)
        } else {
          setOtpError(data.error || 'Failed to send OTP')
        }
      }
    } catch (error) {
      console.error('[!] Error sending OTP:', error)
      setOtpError('Failed to send OTP')
    } finally {
      setDeleteOTPLoading(false)
    }
  }

  const renderStepIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />
      case 'error':
        return <X className="h-4 w-4 text-destructive" />
      default:
        return <Loader2 className="h-4 w-4 animate-spin" />
    }
  }

  const renderStepStatus = (step: { status: string, message: string }) => {
    return (
      <div className="flex items-center gap-2">
        {renderStepIcon(step.status)}
        <span className={step.status === 'error' ? 'text-destructive' : ''}>
          {step.message}
        </span>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl xl:text-3xl font-bold mb-6 text-foreground">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MyAccount />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl gap-2">
              <LayoutDashboard size={20} />
              Dashboard Settings
            </CardTitle>
            <CardDescription>Customize your dashboard experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="hideUpgrades" className="flex items-center">
                  <TbFreeRights className="w-4 h-4 mr-1" />
                  Hide all paid features
                </Label>
                <Switch
                  id="hidePaidFeatures"
                  checked={settings.hidePaidFeatures}
                  onCheckedChange={(checked) => updateSetting('hidePaidFeatures', checked)}
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Trash size={18} className="mr-1" />
              Delete Account
            </CardTitle>
            <CardDescription>Permanently delete your account</CardDescription>
          </CardHeader>
          <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                <Trash size={18} />
                Delete Account
              </Button>
            </DialogTrigger>
            {deleteStep === 'initial' ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Are you sure you want to delete your account? This action cannot be undone.
                </DialogDescription>

                <p className="text-sm mt-2">This will remove your data from the following services:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Nextcloud</li>
                  <li>LibreCloud Internal DB</li>
                </ul>

                <DialogFooter>
                  <Button className="cursor-pointer" variant="destructive" onClick={() => setDeleteStep('otp')}>
                    I understand, continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            ) : deleteStep === 'otp' ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm your identity</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Please confirm with a 6 digit code sent to your email.
                </DialogDescription>

                <div className="flex items-center justify-center gap-6 mt-4">
                  <InputOTP maxLength={6} value={deleteOTP} onChange={handleOTPChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {deleteOTPLoading ? (
                    <Button className="cursor-pointer" variant="outline" disabled>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </Button>
                  ) : showSuccess ? (
                    <Button className="cursor-pointer" variant="outline" disabled>
                      <Check className="h-4 w-4 text-green-500" />
                      Sent!
                    </Button>
                  ) : cooldownSeconds > 0 ? (
                    <Button className="cursor-pointer" variant="outline" disabled>
                      {cooldownSeconds}s
                    </Button>
                  ) : (
                    <Button className="cursor-pointer" variant="outline" onClick={() => sendOTP()}>
                      Send OTP
                    </Button>
                  )}
                </div>

                {otpError && (
                  <p className="text-sm text-destructive mt-2">{otpError}</p>
                )}

                <DialogFooter className="mt-4">
                  <Button 
                    className="cursor-pointer" 
                    variant="destructive" 
                    disabled={!deleteOTP || deleteOTP.length !== 6} 
                    onClick={() => setDeleteStep('confirm')}
                  >
                    Verify OTP
                  </Button>
                </DialogFooter>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Final Confirmation</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Please review the deletion process carefully.
                </DialogDescription>

                <p className="text-sm mt-2">Deleting your account will permanently remove all data associated with your account and email. This action cannot be undone.</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Nextcloud</span>
                    {renderStepStatus(deleteSteps.nextcloud)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    {renderStepStatus(deleteSteps.database)}
                  </div>
                </div>

                {nextcloudError && (
                  <p className="text-sm text-destructive mt-2">{nextcloudError}</p>
                )}
                
                <DialogFooter className="mt-4">
                  {isDeleting ? (
                    <Button className="cursor-pointer" variant="destructive" disabled>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting data...
                    </Button>
                  ) : (
                    <Button 
                      className="cursor-pointer" 
                      variant="destructive" 
                      disabled={deleteSteps.nextcloud.status === 'error' || deleteSteps.database.status === 'error'} 
                      onClick={() => deleteAccount()}
                    >
                      <Trash size={18} />
                      Delete Account
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
          </CardContent>
        </Card>
      </div>
    </>
  )
}