"use client";

import { ChartAreaLegend } from "@/components/AreaChart";
import { ChartBarDefault } from "@/components/BarChart";
import { Metric } from "@/components/Card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center m-20 text-white">
      <h1 className="mb-10 text-2xl font-bold">
        Nytt dashboard for klimagevinster
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Metric label="Klimagevinster" value="100" unit="kgCO2e" />
        <Metric label="Klimagevinster" value="100" unit="kgCO2e" />
        <Metric label="Klimagevinster" value="100" unit="kgCO2e" />
        <Metric label="Klimagevinster" value="100" unit="kgCO2e" />
        <ChartBarDefault />
        <ChartAreaLegend />
      </div>
    </div>
  );
}
