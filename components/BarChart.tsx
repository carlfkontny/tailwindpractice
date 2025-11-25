"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { avfallstype: "Plastemballasje", kgCO2e: 186 },
  { avfallstype: "Papir", kgCO2e: 305 },
  { avfallstype: "Metal", kgCO2e: 237 },
  { avfallstype: "Restavfall", kgCO2e: 73 },
  { avfallstype: "Elektronik", kgCO2e: 209 },
  { avfallstype: "Biomasse", kgCO2e: 214 },
]

const chartConfig = {
  avfallstype: {
    label: "Avfallstype",
    color: "black",
  },
  kgCO2e: {
    label: "kgCO2e/tonn avfall",
    color: "black",
  },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card className="col-span-2 rounded-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="avfallstype"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="kgCO2e" fill="black" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this avfallstype <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
