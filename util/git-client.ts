export interface BranchesResponse {
  branches?: string[]
  error?: string
  code?: number
}

async function getBranches(repo: string, namesOnly: boolean) {
  const branchRes = await fetch(`/api/git/repo/branches?repo=${encodeURIComponent(repo)}&namesOnly=${namesOnly}`)
  
  if (!branchRes.ok) {
    console.log("[! getBranches] Responded with error:", branchRes.statusText)
    return { error: branchRes.statusText }
  }

  const branches = await branchRes.json()
  return { branches: branches.branches }
}

async function getArchive(repoName: string, branch: string, format: string) {
  /* we don't need to check for malicious input because it would only result in a 404 */
  const archiveLink = `${process.env.NEXT_PUBLIC_GITEA_URL}/${repoName}/archive/${branch}.${format}`
  return { archiveLink }
}

export { getBranches, getArchive }