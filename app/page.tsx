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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <Metric label="Total mengde avfall" value="59694" unit="tonn" />
        </div>
        <div className="col-span-1">
          <Metric label="Avfall per innbygger" value="449" unit="kg" />
        </div>
        <div className="col-span-1">
          <Metric
            label="Klimagevinst per tonn avfall"
            value="107"
            unit="kgCO2e"
          />
        </div>
        <div className="col-span-3 max-h-[500px]">
          <ChartBarDefault />
        </div>
        <div className="col-span-3">
          <ChartAreaLegend />
        </div>
      </div>
    </div>
  );
}
