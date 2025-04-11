import OperationalCosts from "@/components/cards/dashboard/statistics/OperationalCosts"
import Infrastructure from "@/components/cards/dashboard/statistics/Infrastructure"

export default function Statistics() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Statistics</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <OperationalCosts />
        <Infrastructure />
      </div>
    </>
  )
}