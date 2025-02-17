import { type ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import SidebarToggle from "@/components/custom/SidebarToggle"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Footer } from "@/components/pages/dashboard/Footer"
import { Header } from "@/components/pages/dashboard/Header";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="grow">
          <SidebarProvider>
            <div className="flex flex-col w-full min-h-screen bg-background">
              <Header />
              {children}
              <div className="lg:ml-64">
                <Footer />
              </div>
            </div>
            <div className="fixed bottom-4 left-4">
              <SidebarToggle />
            </div>
          </SidebarProvider>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default DashboardLayout

