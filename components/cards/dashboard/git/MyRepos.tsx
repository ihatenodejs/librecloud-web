import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book, ExternalLink } from "lucide-react"
import CreateRepo from "@/components/cards/dashboard/git/CreateRepo"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import Link from "next/link"

export function MyRepos({ gitUser }: { gitUser: string }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Book size={20} />
            <span className="text-xl">My Repositories</span>
          </CardTitle>
          <CreateRepo gitUser={gitUser} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>example/example</TableCell>
              <TableCell>
                <div className="flex items-center justify-end mr-1">
                  <Link href="https://git.pontusmail.org/example/example" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 cursor-pointer" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>example/example</TableCell>
              <TableCell>
                <div className="flex items-center justify-end mr-1">
                  <Link href="https://git.pontusmail.org/example/example" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 cursor-pointer" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>example/example</TableCell>
              <TableCell>
                <div className="flex items-center justify-end mr-1">
                  <Link href="https://git.pontusmail.org/example/example" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 cursor-pointer" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}