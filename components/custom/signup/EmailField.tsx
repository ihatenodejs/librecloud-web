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
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="librecloud.cc" className="cursor-pointer">librecloud.cc</SelectItem>
            <SelectItem value="pontusmail.org" className="cursor-pointer">pontusmail.org</SelectItem>
            <SelectItem value="p0ntus.com" className="cursor-pointer">p0ntus.com</SelectItem>
            <SelectItem value="ihate.college" className="cursor-pointer">ihate.college</SelectItem>
            <SelectItem value="pontus.pics" className="cursor-pointer">pontus.pics</SelectItem>
            <SelectItem value="dontbeevil.lol" className="cursor-pointer">dontbeevil.lol</SelectItem>
            <SelectItem value="dont-be-evil.lol" className="cursor-pointer">dont-be-evil.lol</SelectItem>
            <SelectItem value="strongintegrity.life" className="cursor-pointer">strongintegrity.life</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

