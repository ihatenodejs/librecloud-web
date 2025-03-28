"use client";

import { motion } from "motion/react"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChangePassword } from "@/components/cards/dashboard/Settings/ChangePassword"
import { useState, useEffect } from "react"
import { LayoutDashboard } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Settings() {
  const [settings, setSettings] = useState({
    hideGenAI: false,
    hideUpgrades: false,
    hideCrypto: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        } else {
          console.error('[!] Failed to fetch settings');
        }
      } catch (error) {
        console.error('[!] Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings()
  }, []);

  const updateSetting = async (settingName: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: value
    }));

    try {
      setLoading(true);
      const response = await fetch('/api/users/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          [settingName]: value
        }),
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        setSettings(updatedSettings);
      } else {
        console.error('[!] Failed to update settings');
        setSettings(prev => ({
          ...prev,
          [settingName]: !value
        }));
      }
    } catch (error) {
      console.error('[!] Error updating settings:', error);
      setSettings(prev => ({
        ...prev,
        [settingName]: !value
      }));
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-6 text-foreground">Settings</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ChangePassword />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LayoutDashboard size={15} className="mr-1" />
                    UI Settings
                  </CardTitle>
                  <CardDescription>
                    Modify your user experience here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hide-ai">Hide Generative AI</Label>
                      <Switch
                        id="hide-ai"
                        checked={settings.hideGenAI}
                        disabled={loading}
                        onCheckedChange={(checked) => updateSetting('hideGenAI', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hide-upgrades">Hide all upgrades/roles</Label>
                      <Switch
                        id="hide-upgrades"
                        checked={settings.hideUpgrades}
                        disabled={loading}
                        onCheckedChange={(checked) => updateSetting('hideUpgrades', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hide-crypto">Hide crypto exchange</Label>
                      <Switch
                        id="hide-crypto"
                        checked={settings.hideCrypto}
                        disabled={loading}
                        onCheckedChange={(checked) => updateSetting('hideCrypto', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

