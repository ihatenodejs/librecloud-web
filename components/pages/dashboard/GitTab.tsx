import { MyRepos } from "@/components/cards/dashboard/git/MyRepos"
import { GiteaProfileCard } from "@/components/cards/dashboard/git/GiteaProfileCard"
import { LinkGitea } from "@/components/cards/dashboard/git/LinkGitea"
import { AccountManagement } from "@/components/cards/dashboard/git/AccountManagement"

export interface DashboardState {
  gitUser: string
  gitAvatar?: string
  gitLastLogin?: string
  gitFollowerCt: number
  gitFollowingCt: number
  gitIsAdmin: boolean
  gitEmail?: string
}

export const GitTab = ({ dashboardState }: { dashboardState: DashboardState }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 grid-flow-row">
        {(dashboardState.gitUser && dashboardState.gitUser !== "Unlinked") && (
          <>
            <GiteaProfileCard dashboardState={dashboardState} />
            <AccountManagement dashboardState={dashboardState} />
          </>
        )}
        <LinkGitea linked={!!dashboardState.gitUser && dashboardState.gitUser !== "Unlinked"} />
      </div>
      {(dashboardState.gitUser && dashboardState.gitUser !== "Unlinked") && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-2">
          <MyRepos gitUser={dashboardState.gitUser} />
        </div>
      )}
    </div>
  )
}

