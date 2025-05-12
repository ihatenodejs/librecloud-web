import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"
import Link from "next/link"
import { Repo } from "@/components/cards/dashboard/git/MyRepos"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DownloadArchive } from "@/components/git/DownloadRepoArchive"
import { SiGitea } from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

function RepoActions({ repo }: { repo: Repo }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Open in</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer">
          <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <SiGitea className="h-4 w-4" />
            LibreCloud Git
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href={`vscode://vscode.git/clone?url=https%3A%2F%2Fgit.pontusmail.org%2F${encodeURIComponent(repo.name)}.git`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <VscVscode className="h-4 w-4" />
            VSCode
          </Link>
        </DropdownMenuItem>        
        <DownloadArchive repo={repo} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function RepoRow({ repo }: { repo: Repo }) {
  return (
    <TableRow key={repo.name}>
      <TableCell>{repo.name}</TableCell>
      <TableCell className="text-right">
        <RepoActions repo={repo} />
      </TableCell>
    </TableRow>
  )
}

export function MyReposTable({ repos, showAll }: { repos: Repo[], showAll: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!showAll && repos.slice(0, 5).map((repo) => (
          <RepoRow key={repo.name} repo={repo} />
        ))}
        {showAll && (
          repos.map((repo) => (
            <RepoRow key={repo.name} repo={repo} />
          ))
        )}
      </TableBody>
    </Table>
  )
}