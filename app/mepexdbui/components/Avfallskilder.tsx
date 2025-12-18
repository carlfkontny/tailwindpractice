"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Legend, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
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

export const description = "A donut chart with text";

const chartData = [
  { kilde: "bygg", tonnAvfall: 2669, fill: "var(--color-chart-1)" },
  { kilde: "industri", tonnAvfall: 1929, fill: "var(--color-chart-2)" },
  { kilde: "tjenestytende", tonnAvfall: 1897, fill: "var(--color-chart-3)" },
  { kilde: "privat", tonnAvfall: 2167, fill: "var(--color-chart-4)" },
  { kilde: "annet", tonnAvfall: 2437, fill: "var(--color-chart-5)" },
];

const chartConfig = {
  tonnAvfall: {
    label: "Tonn avfall",
  },
  bygg: {
    label: "Bygg/anlegg",
    color: "var(--chart-1)",
  },
  industri: {
    label: "Industri",
    color: "var(--chart-2)",
  },
  tjenestytende: {
    label: "Tjenesteytende",
    color: "var(--chart-3)",
  },
  privat: {
    label: "Private hush.",
    color: "var(--chart-4)",
  },
  annet: {
    label: "Andre/uspesifisert",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function Avfallskilder() {
  const totalTonnAvfall = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tonnAvfall, 0) / 1000; //round to 1 decimal
  }, []).toFixed(1);

  return (
    <Card className="col-span-1 border-none shadow-none min-w-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Avfallskilder</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-w-0 px-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tonnAvfall"
              nameKey="kilde"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTonnAvfall.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          mill. tonn avfall
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend
              content={(props) => (
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-3 px-2 max-w-full">
                  {props.payload?.map((item) => {
                    const key = item.value as string; // For pie charts, value is the kilde
                    const itemConfig =
                      chartConfig[key as keyof typeof chartConfig];
                    return (
                      <div
                        key={item.value}
                        className="flex items-center gap-1.5 text-xs shrink-0"
                      >
                        <div
                          className="h-2 w-2 shrink-0 rounded-[2px]"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                        <span>{itemConfig?.label || item.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
