"use client";

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { validateEmail } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

interface ChangePasswordProps {
  gitEmail: string;
}

export function ChangeEmail({ gitEmail }: ChangePasswordProps) {
  const [newEmail, setNewEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewEmail(value);
    
    // Validate email
    const [username, domain] = value.split('@');
    if (username && domain) {
      const validation = validateEmail(username, domain);
      if (!validation.valid) {
        setEmailError(validation.message);
      } else {
        setEmailError(null);
      }
    } else if (value) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (emailError) {
      return;
    }
    
    setLoading(true);
    setMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setMessage("Email updated successfully.");
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input
              id="current-email"
              value={gitEmail}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email</Label>
            <Input 
              id="new-email" 
              type="email" 
              value={newEmail} 
              onChange={handleEmailChange} 
            />
            {emailError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={14} />
                {emailError}
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={!!emailError || !newEmail}
          >
            {loading ? "Changing..." : "Change Email"}
          </Button>
          {message && <p className="text-sm text-center">{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangeEmail;