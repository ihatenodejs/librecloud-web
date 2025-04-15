"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import MyAccount from "@/components/cards/dashboard/Settings/MyAccount"
import { useState, useEffect } from "react"
import { LayoutDashboard } from "lucide-react"

export default function Settings() {
  const [settings, setSettings] = useState({
    hideGenAI: false,
    hideUpgrades: false,
    hideCrypto: false
  });
  const [loading, setLoading] = useState(false)

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

  return (
    <>
      <h1 className="text-2xl xl:text-3xl font-bold mb-6 text-foreground">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MyAccount />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutDashboard size={15} className="mr-1" />
              Dashboard Settings
            </CardTitle>
            <CardDescription>Customize your dashboard experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="hideGenAI">Hide Generative AI</Label>
                <Switch
                  id="hideGenAI"
                  checked={settings.hideGenAI}
                  onCheckedChange={(checked) => updateSetting('hideGenAI', checked)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hideUpgrades">Hide Upgrades</Label>
                <Switch
                  id="hideUpgrades"
                  checked={settings.hideUpgrades}
                  onCheckedChange={(checked) => updateSetting('hideUpgrades', checked)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hideCrypto">Hide Crypto Exchange</Label>
                <Switch
                  id="hideCrypto"
                  checked={settings.hideCrypto}
                  onCheckedChange={(checked) => updateSetting('hideCrypto', checked)}
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

