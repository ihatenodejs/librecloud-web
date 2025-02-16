//import { DiskUsage } from "@/components/cards/dashboard/DiskUsage"
import { WelcomeCard } from "@/components/cards/dashboard/overview/WelcomeCard"
import { LinkedAccounts } from "@/components/cards/dashboard/overview/LinkedAccounts"

export const OverviewTab = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <WelcomeCard />
    {/* TODO: Disabled for later - <DiskUsage />*/}
    <LinkedAccounts />
  </div>
)

