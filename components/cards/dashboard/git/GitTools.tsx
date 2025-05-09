import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
//import { type DashboardState } from "@/components/pages/dashboard/GitTab"
import CreateRepo from "./CreateRepo"

export function GitTools({ gitUser }: { gitUser: string }) {
  return (
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Git Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateRepo gitUser={gitUser} />
        </CardContent>
      </Card>
    )
}