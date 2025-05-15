import { prisma } from "@/lib/prisma"
import { XMLParser } from "fast-xml-parser"

let lastSyncTime: number | null = null
const SYNC_INTERVAL = 60 * 60 * 1000 // 1h

async function fetchOwncloudUsers() {
  const owncloudUsername = process.env.OWNCLOUD_ADMIN_USERNAME
  const owncloudPassword = process.env.OWNCLOUD_ADMIN_PASSWORD
  const owncloudUrl = process.env.OWNCLOUD_URL
  
  if (!owncloudUsername || !owncloudPassword || !owncloudUrl) {
    throw new Error("[!] Missing ownCloud credentials or URL")
  }
  
  const basicAuth = Buffer.from(`${owncloudUsername}:${owncloudPassword}`).toString('base64')
  
  const response = await fetch(`${owncloudUrl}/ocs/v2.php/cloud/users`, {
    headers: {
      "Authorization": `Basic ${basicAuth}`,
    }
  })
  
  if (!response.ok) {
    throw new Error(`[!] Failed to fetch ownCloud users: ${response.statusText}`)
  }
  
  const xmlText = await response.text()
  const parser = new XMLParser()
  const result = parser.parse(xmlText)
  
  const users = result.ocs.data.users.element || []
  return Array.isArray(users) ? users : [users]
}

async function fetchOwncloudUserDetails(userId: string) {
  const owncloudUsername = process.env.OWNCLOUD_ADMIN_USERNAME
  const owncloudPassword = process.env.OWNCLOUD_ADMIN_PASSWORD
  const owncloudUrl = process.env.OWNCLOUD_URL
  
  if (!owncloudUsername || !owncloudPassword || !owncloudUrl) {
    throw new Error("[!] Missing ownCloud credentials or URL")
  }
  
  const basicAuth = Buffer.from(`${owncloudUsername}:${owncloudPassword}`).toString('base64')
  
  const response = await fetch(`${owncloudUrl}/ocs/v2.php/cloud/users/${userId}`, {
    headers: {
      "Authorization": `Basic ${basicAuth}`,
    }
  })
  
  if (!response.ok) {
    throw new Error(`[!] Failed to fetch ownCloud user details: ${response.statusText}`)
  }
  
  const xmlText = await response.text()
  const parser = new XMLParser()
  const result = parser.parse(xmlText)
  
  return result.ocs.data
}

export async function syncUserWithOwncloud(email: string, bypassCache: boolean = false): Promise<string | null> {
  try {
    const now = Date.now()
    if (lastSyncTime === null || now - lastSyncTime > SYNC_INTERVAL || bypassCache) {
      await syncAllOwncloudUsers()
      lastSyncTime = now
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    return user?.owncloudId || null
  } catch (error) {
    console.error(`[!] Error syncing user ${process.env.NODE_ENV === 'development' ? email : ''} with ownCloud:`, process.env.NODE_ENV === 'development' ? error : null)
    return null
  }
}

async function syncAllOwncloudUsers() {
  try {
    const owncloudUserIds = await fetchOwncloudUsers()
    
    for (const userId of owncloudUserIds) {
      try {
        const userDetails = await fetchOwncloudUserDetails(userId)
        
        if (!userDetails.email) {
          console.log(`[i] Skipping user ${process.env.NODE_ENV === 'development' ? userId : ''} - no email found`)
          continue
        }
        
        await prisma.user.upsert({
          where: { email: userDetails.email },
          update: { owncloudId: userId },
          create: {
            email: userDetails.email,
            owncloudId: userId,
            username: userDetails.id
          }
        })
      } catch (error) {
        console.error(`[!] Error processing user ${process.env.NODE_ENV === 'development' ? userId : ''}`, process.env.NODE_ENV === 'development' ? error : null)
      }
    }
    
    console.log("[i] ownCloud users synced successfully")
  } catch (error) {
    console.error("[!] Error syncing ownCloud users:", process.env.NODE_ENV === 'development' ? error : null)
    throw error
  }
}

export async function deleteOwncloudUser(owncloudId: string): Promise<boolean> {
  try {
    const owncloudUsername = process.env.OWNCLOUD_ADMIN_USERNAME
    const owncloudPassword = process.env.OWNCLOUD_ADMIN_PASSWORD
    const owncloudUrl = process.env.OWNCLOUD_URL
    
    if (!owncloudUsername || !owncloudPassword || !owncloudUrl) {
      console.error("[!] Missing ownCloud credentials or URL")
      return false
    }
    
    const basicAuth = Buffer.from(`${owncloudUsername}:${owncloudPassword}`).toString('base64')
    
    const response = await fetch(`${owncloudUrl}/ocs/v2.php/cloud/users/${owncloudId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Basic ${basicAuth}`,
      }
    })
    
    if (!response.ok) {
      console.error(`[!] Failed to delete ownCloud user ${process.env.NODE_ENV === 'development' ? owncloudId : ''}`, process.env.NODE_ENV === 'development' ? response.statusText : null)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`[!] Error deleting ownCloud user ${process.env.NODE_ENV === 'development' ? owncloudId : ''}`, process.env.NODE_ENV === 'development' ? error : null)
    return false
  }
}