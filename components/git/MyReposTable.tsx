import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "../ui/table"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Repo } from "@/components/cards/dashboard/git/MyRepos"

export function MyReposTable({ repos }: { repos: Repo[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repos.map((repo) => (
          <TableRow key={repo.name}>
            <TableCell>{repo.name}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end mr-1">
                <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 cursor-pointer" />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}