"use client";

import * as React from "react";
import { Info, X } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { scope: "Scope 1", tonnCO2e: 100, fill: "var(--color-chart-3)" },
  { scope: "Scope 2", tonnCO2e: 50, fill: "var(--color-chart-5)" },
  { scope: "Scope 3", tonnCO2e: 500, fill: "var(--color-chart-2)" },
];

const chartConfig = {
  scope: {
    label: "Scope",
  },
} satisfies ChartConfig;

const totalTonnCO2e = chartData.reduce((acc, curr) => acc + curr.tonnCO2e, 0);
export function ChartPieDonutText() {
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);
  const infoBoxRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isInfoOpen &&
        infoBoxRef.current &&
        buttonRef.current &&
        !infoBoxRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsInfoOpen(false);
      }
    };

    if (isInfoOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInfoOpen]);

  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Totale utslipp i 2024 </CardTitle>
        <CardDescription className="relative">
          Totale utslipp i 2024 fordelt på{" "}
          <button
            ref={buttonRef}
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="text-primary underline underline-offset-2 hover:text-primary/80 cursor-pointer inline-flex items-center gap-1"
          >
            scope 1-3
            <Info className="h-3 w-3" />
          </button>
          {isInfoOpen && (
            <div
              ref={infoBoxRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-80 bg-popover border border-border rounded-lg shadow-lg p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-sm">Scope 1-3 forklaring</h4>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Lukk"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <div>
                  <strong className="text-foreground">Scope 1:</strong> Direkte
                  utslipp fra organisasjonens egne kilder (f.eks. brenning av
                  fossilt brensel, kjøretøy).
                </div>
                <div>
                  <strong className="text-foreground">Scope 2:</strong>{" "}
                  Indirekte utslipp fra kjøpt energi (f.eks. strøm, varme,
                  kjøling).
                </div>
                <div>
                  <strong className="text-foreground">Scope 3:</strong> Alle
                  andre indirekte utslipp i verdikjeden (f.eks. innkjøp,
                  transport, avfall, forretningsreiser).
                </div>
              </div>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tonnCO2e"
              nameKey="scope"
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
                          {totalTonnCO2e.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          tonn CO2e
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
