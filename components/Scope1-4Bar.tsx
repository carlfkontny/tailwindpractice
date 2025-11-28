"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { scope: "Scope 1", tonnCO2e: 186, fill: "var(--color-chart-3)" },
  { scope: "Scope 2", tonnCO2e: 305, fill: "var(--color-chart-5)" },
  { scope: "Scope 3", tonnCO2e: 237, fill: "var(--color-chart-2)" },
  { scope: "Scope 4", tonnCO2e: -800, fill: "var(--color-chart-1)" },
];

const chartConfig = {
  scope: {
    label: "Scope",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Scope14Bar() {
  return (
    <Card className="flex flex-col border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Utslipp per scope</CardTitle>
        <CardDescription>Utslipp per scope 1-4</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="scope"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tonnCO2e" fill="var(--color-scope)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this scope <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
