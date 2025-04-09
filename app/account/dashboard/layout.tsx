import { type ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Footer } from "@/components/pages/dashboard/Footer"
import { Header } from "@/components/pages/dashboard/Header"
import { ServerSideMenu } from "@/components/pages/dashboard/ServerSideMenu"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  // Server-side auth check
  const session = await auth()
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect("/account/login")
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen w-full flex flex-col bg-background text-foreground">
        <SidebarProvider>
          <div className="flex w-full h-screen overflow-hidden">
            <ServerSideMenu />
            <div className="flex-1 w-full flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 w-full overflow-y-auto">
                <div className="p-8 w-full">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default DashboardLayout

