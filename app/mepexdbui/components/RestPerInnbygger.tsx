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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { kommune: "Oslo", restPerInnbygger: 186 },
  { kommune: "Bergen", restPerInnbygger: 305 },
  { kommune: "Trondheim", restPerInnbygger: 237 },
  { kommune: "Stavanger", restPerInnbygger: 73 },
  { kommune: "Kristiansand", restPerInnbygger: 209 },
  { kommune: "Sandvika", restPerInnbygger: 214 },
];

const chartConfig = {
  restPerInnbygger: {
    label: "Rest per innbygger",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RestPerInnbygger() {
  return (
    <Card className="col-span-2 border-none shadow-none min-w-0">
      <CardHeader>
        <CardTitle>Rest per innbygger</CardTitle>
        <CardDescription>
          Restavfall i husholdningsavfallet i 2024. Kilo per innbygger.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="kommune"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="restPerInnbygger"
              fill="var(--color-restPerInnbygger)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
