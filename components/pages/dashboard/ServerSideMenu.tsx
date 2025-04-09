import { auth } from "@/auth"
import { SideMenu } from "./SideMenu"
import { prisma } from "@/lib/prisma"

export async function ServerSideMenu() {
  // Server-side auth check
  const session = await auth()
  
  if (!session || !session.user || !session.user.email) {
    return null
  }

  // Fetch user settings
  const userSettings = await fetchUserSettings(session.user.email)
  
  return (
    <SideMenu 
      initialSettings={userSettings}
    />
  )
}

async function fetchUserSettings(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return {
      hideGenAI: user.hideGenAI,
      hideUpgrades: user.hideUpgrades,
      hideCrypto: user.hideCrypto,
    }
  } else {
    const newUser = await prisma.user.create({ data: { email } });
    return {
      hideGenAI: newUser.hideGenAI,
      hideUpgrades: newUser.hideUpgrades,
      hideCrypto: newUser.hideCrypto,
    }
  }
} 