//import { DiskUsage } from "@/components/cards/dashboard/DiskUsage"
import { WelcomeCard } from "@/components/cards/dashboard/overview/WelcomeCard"
import { LinkedAccounts } from "@/components/cards/dashboard/overview/LinkedAccounts"
import { QuickLinks } from "@/components/cards/dashboard/overview/QuickLinks"

export const OverviewTab = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    <WelcomeCard />
    {/* TODO: Disabled for later - <DiskUsage />*/}
    <LinkedAccounts />
    <QuickLinks />
  </div>
)

