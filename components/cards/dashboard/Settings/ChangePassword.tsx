"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/mail/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const resData = await response.json();

      if (response.ok && resData.success) {
        setMessage("Password Updated");
        setLoading(false);
      } else if (resData.error) {
        setMessage(resData.error);
        setLoading(false);
      } else {
        setMessage("[1] Failed to Update");
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      setMessage("[2] Failed to Update");
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email Password</CardTitle>
        <CardDescription>Please note, this will <b>NOT</b> change your Authentik password. You can change that <Link href="">here</Link>.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
          {message && <p className="text-sm text-center">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePassword;