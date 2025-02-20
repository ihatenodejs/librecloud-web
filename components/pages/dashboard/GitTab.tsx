import { GiteaProfileCard } from "@/components/cards/dashboard/git/GiteaProfileCard"
import { LinkGitea } from "@/components/cards/dashboard/git/LinkGitea"
//import { CreateRepo } from "@/components/cards/dashboard/git/CreateRepo"
//import { ChangeUsername } from "@/components/cards/dashboard/git/ChangeUsername"
//import { ChangePassword } from "@/components/cards/dashboard/git/ChangePassword"
//import { ChangeEmail } from "@/components/cards/dashboard/git/ChangeEmail"

interface DashboardState {
  gitUser: string;
  gitAvatar?: string;
  gitLastLogin?: string;
  gitFollowerCt: number;
  gitFollowingCt: number;
  gitIsAdmin: boolean;
  gitEmail?: string;
}

export const GitTab = ({ dashboardState }: { dashboardState: DashboardState }) => {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(dashboardState.gitUser && dashboardState.gitUser !== "Unlinked") && (
          <GiteaProfileCard dashboardState={dashboardState} />
        )}
        <LinkGitea linked={!!dashboardState.gitUser && dashboardState.gitUser !== "Unlinked"} />
        {/*
        ~-~-~-~-~-~-~-~-~-~-~-~DISABLED FOR NOW~-~-~-~-~-~-~-~-~-~-~-~
        <ChangeUsername gitUser={dashboardState.gitUser} />
        <ChangePassword />
        <ChangeEmail gitEmail={dashboardState.gitEmail || ""} />
        <CreateRepo />
        */}
      </div>
    </div>
  )
}

