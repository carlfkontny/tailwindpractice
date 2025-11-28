"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { avfallstype: "Plastemballasje", kgCO2e: 186, color: "var(--plast)" },
  { avfallstype: "Papir", kgCO2e: 305, color: "var(--papp-papir-kartong)" },
  { avfallstype: "Metal", kgCO2e: 237, color: "var(--metall)" },
  { avfallstype: "Restavfall", kgCO2e: 73, color: "var(--restavfall)" },
  { avfallstype: "Elektronikk", kgCO2e: 209, color: "var(--elektronikk)" },
  {
    avfallstype: "Glass- og metallemballasje",
    kgCO2e: 214,
    color: "var(--glass)",
  },
  { avfallstype: "Tekstiler", kgCO2e: 214, color: "var(--tekstiler)" },
  { avfallstype: "Ombruk", kgCO2e: 214, color: "var(--ombruk)" },
  { avfallstype: "Bygg", kgCO2e: 214, color: "var(--bygg)" },
  { avfallstype: "Tre", kgCO2e: 214, color: "var(--tre)" },
  { avfallstype: "Natur", kgCO2e: 214, color: "var(--natur)" },
  {
    avfallstype: "Medisinsk og smittefarlig avfall",
    kgCO2e: 214,
    color: "var(--medisinsk-og-smittefarlig-avfall)",
  },
  { avfallstype: "Pant", kgCO2e: 214, color: "var(--pant)" },
  {
    avfallstype: "Ødelagte klær og tekstiler",
    kgCO2e: 214,
    color: "var(--odelagte-klaer-og-tekstiler)",
  },
  { avfallstype: "Farlig avfall", kgCO2e: 214, color: "var(--farlig-avfall)" },
  { avfallstype: "Matavfall", kgCO2e: 214, color: "var(--matavfall)" },
  { avfallstype: "Plastemballasje", kgCO2e: 186, color: "var(--plast)" },
  { avfallstype: "Papir", kgCO2e: 305, color: "var(--papp-papir-kartong)" },
  { avfallstype: "Metal", kgCO2e: 237, color: "var(--metall)" },
  { avfallstype: "Restavfall", kgCO2e: 73, color: "var(--restavfall)" },
  { avfallstype: "Elektronikk", kgCO2e: 209, color: "var(--elektronikk)" },
  {
    avfallstype: "Glass- og metallemballasje",
    kgCO2e: 214,
    color: "var(--glass)",
  },
  { avfallstype: "Tekstiler", kgCO2e: 214, color: "var(--tekstiler)" },
  { avfallstype: "Ombruk", kgCO2e: 214, color: "var(--ombruk)" },
  { avfallstype: "Bygg", kgCO2e: 214, color: "var(--bygg)" },
  { avfallstype: "Tre", kgCO2e: 214, color: "var(--tre)" },
  { avfallstype: "Natur", kgCO2e: 214, color: "var(--natur)" },
  {
    avfallstype: "Medisinsk og smittefarlig avfall",
    kgCO2e: 214,
    color: "var(--medisinsk-og-smittefarlig-avfall)",
  },
  { avfallstype: "Pant", kgCO2e: 214, color: "var(--pant)" },
  {
    avfallstype: "Ødelagte klær og tekstiler",
    kgCO2e: 214,
    color: "var(--odelagte-klaer-og-tekstiler)",
  },
  { avfallstype: "Farlig avfall", kgCO2e: 214, color: "var(--farlig-avfall)" },
  { avfallstype: "Matavfall", kgCO2e: 214, color: "var(--matavfall)" },
];

function sortDataDescending<T extends { kgCO2e: number }>(data: T[]): T[] {
  return [...data].sort((a, b) => b.kgCO2e - a.kgCO2e);
}

const chartConfig = {
  kgCO2e: {
    label: "kgCO2e/tonn avfall",
  },
  avfallstype: {
    label: "Avfallstype",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  const sortedData = sortDataDescending(chartData);

  return (
    <Card className="rounded-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart accessibilityLayer data={sortedData}>
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
            <Bar dataKey="kgCO2e" fill="black" radius={8}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
