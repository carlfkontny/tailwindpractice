"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { kategori: "Transportutslipp", tonnCO2e: -200, color: "var(--color-chart-1)" },
  { kategori: "Utslipp, energigjenvinning", tonnCO2e: -500, color: "var(--color-chart-2)" },
  { kategori: "Klimagevinst, energigjenvinning", tonnCO2e: 100, color: "var(--color-chart-3)" },
  { kategori: "Utslipp, materialgjenvinning", tonnCO2e: -80, color: "var(--color-chart-4)" },
  { kategori: "Klimagevinst, materialgjenvinning og ombruk", tonnCO2e: 900, color: "var(--color-chart-7)" },
  { kategori: "Total klimagevinst (netto)", tonnCO2e: 400, color: "var(--color-chart-6)" },
]

const chartConfig = {
  kategori: {
    label: "Kategori",
  },
  tonnCO2e: {
    label: "Tonn CO2e",
  },
} satisfies ChartConfig

export function StolpeUtslippPerKategori() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Utslipp per kategori</CardTitle>
        <CardDescription>Utslipp per kategori i 2025.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 40,
              bottom: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="kategori"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            //   tickFormatter={(value) => value.slice(0, 3)}
              angle={-45}
              textAnchor="end"
              height={150}
            />
            <YAxis
              dataKey="tonnCO2e"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tonnCO2e" radius={8}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total klimagevinst (netto) er 400 tonn CO2e <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
