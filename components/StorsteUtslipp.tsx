//Hvor kommer de store utslippene fra?
"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartData = [
  { kilde: "Energigjenvinning, restavfall", tonnCO2e: 186 },
  { kilde: "Materialgjenvinning, papir", tonnCO2e: 305 },
  { kilde: "Materialgjenvinning, trevirke", tonnCO2e: 237 },
  { kilde: "Energigjenvinning, metaller", tonnCO2e: 73 },
  { kilde: "Energigjenvinning, maling, lim, lakk", tonnCO2e: 209 },
].sort((a, b) => b.tonnCO2e - a.tonnCO2e);

const chartConfig = {
  kilde: {
    label: "Kilde",
    color: "var(--chart-1)",
  },
  tonnCO2e: {
    label: "Tonn CO2e",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function StorsteUtslipp() {
  return (
    <Card className="overflow-hidden border-none shadow-none">
      <CardHeader>
        <CardTitle>Største utslipp</CardTitle>
        <CardDescription>Hvor kommer de største utslippene fra i 2024?</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="tonnCO2e" hide />
            <YAxis
              dataKey="kilde"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              width={250}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tonnCO2e" fill="var(--color-kilde)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
