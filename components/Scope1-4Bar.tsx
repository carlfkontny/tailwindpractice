"use client";

import * as React from "react";
import { Info, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
    <Card className="flex flex-col border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Utslipp og klimagevinster</CardTitle>
        <CardDescription className="relative">
          Alle utslipp fordelt på scope 1-3 og{" "}
          <button
            ref={buttonRef}
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="text-primary underline underline-offset-2 hover:text-primary/80 cursor-pointer inline-flex items-center gap-1"
          >
            unngåtte utslipp (scope 4)
            <Info className="h-3 w-3" />
          </button>
          {isInfoOpen && (
            <div
              ref={infoBoxRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-80 bg-popover border border-border rounded-lg shadow-lg p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-sm">Scope 4 forklaring</h4>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Lukk"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Scope 4:</strong> Unngåtte
                  utslipp (avoided emissions) refererer til utslipp som ikke
                  oppstår på grunn av organisasjonens produkter eller tjenester.
                  Dette inkluderer klimagevinster fra for eksempel gjenbruk,
                  resirkulering, eller produkter som erstatter mer
                  karbonintensive alternativer.
                </div>
              </div>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
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
    </Card>
  );
}
