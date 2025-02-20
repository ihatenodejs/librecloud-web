"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ChangeUsernameProps {
  gitUser: string;
}

export function ChangeUsername({ gitUser }: ChangeUsernameProps) {
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setMessage("Username updated successfully.");
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Username</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-username">Old Username</Label>
            <Input
              id="old-username"
              type="text"
              value={gitUser}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-username">New Username</Label>
            <Input
              id="new-username"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Username"}
          </Button>
          {message && <p className="text-sm text-center">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangeUsername;
