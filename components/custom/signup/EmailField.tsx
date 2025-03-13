import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type React from "react"

interface EmailFieldProps {
  formData: {
    emailUsername: string
    emailDomain: string
  }
  errorAlert: string | null
  setErrorAlert: React.Dispatch<React.SetStateAction<string | null>>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (value: string) => void
}

export default function EmailField({ formData, handleInputChange, handleSelectChange }: EmailFieldProps) {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <div className="flex items-center space-x-2">
        <Input
          id="emailUsername"
          name="emailUsername"
          type="text"
          placeholder="username"
          required
          value={formData.emailUsername}
          onChange={handleInputChange}
          className="grow"
        />
        <span className="text-muted-foreground">@</span>
        <Select
          name="emailDomain"
          value={formData.emailDomain}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="librecloud.cc">librecloud.cc</SelectItem>
            <SelectItem value="pontusmail.org">pontusmail.org</SelectItem>
            <SelectItem value="p0ntus.com">p0ntus.com</SelectItem>
            <SelectItem value="ihate.college">ihate.college</SelectItem>
            <SelectItem value="pontus.pics">pontus.pics</SelectItem>
            <SelectItem value="dontbeevil.lol">dontbeevil.lol</SelectItem>
            <SelectItem value="dont-be-evil.lol">dont-be-evil.lol</SelectItem>
            <SelectItem value="strongintegrity.life">strongintegrity.life</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

