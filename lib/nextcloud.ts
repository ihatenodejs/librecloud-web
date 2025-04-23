import { prisma } from "@/lib/prisma"
import { XMLParser } from "fast-xml-parser"

let lastSyncTime: number | null = null
const SYNC_INTERVAL = 60 * 60 * 1000 // 1h

async function fetchNextcloudUsers() {
  const nextcloudUsername = process.env.NEXTCLOUD_ADMIN_USERNAME
  const nextcloudPassword = process.env.NEXTCLOUD_ADMIN_PASSWORD
  const nextcloudUrl = process.env.NEXTCLOUD_URL
  
  if (!nextcloudUsername || !nextcloudPassword || !nextcloudUrl) {
    throw new Error("[!] Missing Nextcloud credentials or URL")
  }
  
  const basicAuth = Buffer.from(`${nextcloudUsername}:${nextcloudPassword}`).toString('base64')
  
  const response = await fetch(`${nextcloudUrl}/ocs/v2.php/cloud/users`, {
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "OCS-APIRequest": "true"
    }
  })
  
  if (!response.ok) {
    throw new Error(`[!] Failed to fetch Nextcloud users: ${response.statusText}`)
  }
  
  const xmlText = await response.text()
  const parser = new XMLParser()
  const result = parser.parse(xmlText)
  
  const users = result.ocs.data.users.element || []
  return Array.isArray(users) ? users : [users]
}

async function fetchNextcloudUserDetails(userId: string) {
  const nextcloudUsername = process.env.NEXTCLOUD_ADMIN_USERNAME
  const nextcloudPassword = process.env.NEXTCLOUD_ADMIN_PASSWORD
  const nextcloudUrl = process.env.NEXTCLOUD_URL
  
  if (!nextcloudUsername || !nextcloudPassword || !nextcloudUrl) {
    throw new Error("[!] Missing Nextcloud credentials or URL")
  }
  
  const basicAuth = Buffer.from(`${nextcloudUsername}:${nextcloudPassword}`).toString('base64')
  
  const response = await fetch(`${nextcloudUrl}/ocs/v2.php/cloud/users/${userId}`, {
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "OCS-APIRequest": "true"
    }
  })
  
  if (!response.ok) {
    throw new Error(`[!] Failed to fetch Nextcloud user details: ${response.statusText}`)
  }
  
  const xmlText = await response.text()
  const parser = new XMLParser()
  const result = parser.parse(xmlText)
  
  return result.ocs.data
}

export async function syncUserWithNextcloud(email: string, bypassCache: boolean = false): Promise<string | null> {
  try {
    const now = Date.now()
    if (lastSyncTime === null || now - lastSyncTime > SYNC_INTERVAL || bypassCache) {
      await syncAllNextcloudUsers()
      lastSyncTime = now
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    return user?.nextcloudId || null
  } catch (error) {
    console.error(`[!] Error syncing user ${email} with Nextcloud:`, error)
    return null
  }
}

async function syncAllNextcloudUsers() {
  try {
    const nextcloudUserIds = await fetchNextcloudUsers()
    
    for (const userId of nextcloudUserIds) {
      try {
        const userDetails = await fetchNextcloudUserDetails(userId)
        
        if (!userDetails.email) {
          console.log(`[i] Skipping user ${userId} - no email found`)
          continue
        }
        
        await prisma.user.upsert({
          where: { email: userDetails.email },
          update: { nextcloudId: userId },
          create: {
            email: userDetails.email,
            nextcloudId: userId,
            username: userDetails.id
          }
        })
      } catch (error) {
        console.error(`[!] Error processing user ${userId}:`, error)
      }
    }
    
    console.log("Nextcloud users synced successfully")
  } catch (error) {
    console.error("[!] Error syncing Nextcloud users:", error)
    throw error
  }
}

export async function deleteNextcloudUser(nextcloudId: string): Promise<boolean> {
  try {
    const nextcloudUsername = process.env.NEXTCLOUD_ADMIN_USERNAME
    const nextcloudPassword = process.env.NEXTCLOUD_ADMIN_PASSWORD
    const nextcloudUrl = process.env.NEXTCLOUD_URL
    
    if (!nextcloudUsername || !nextcloudPassword || !nextcloudUrl) {
      console.error("[!] Missing Nextcloud credentials or URL")
      return false
    }
    
    const basicAuth = Buffer.from(`${nextcloudUsername}:${nextcloudPassword}`).toString('base64')
    
    const response = await fetch(`${nextcloudUrl}/ocs/v2.php/cloud/users/${nextcloudId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "OCS-APIRequest": "true"
      }
    })
    
    if (!response.ok) {
      console.error(`[!] Failed to delete Nextcloud user: ${response.statusText} (${response.status})`)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`[!] Error deleting Nextcloud user ${nextcloudId}:`, error)
    return false
  }
}