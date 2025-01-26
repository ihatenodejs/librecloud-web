import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Theme appearance="dark" accentColor="blue" grayColor="slate">
      <div className="min-h-screen bg-gray-900">{children}</div>
    </Theme>
  )
}

