"use client";

import { ChartAreaLegend } from "@/components/AreaChart";
import { ChartBarDefault } from "@/components/BarChart";
import { Metric } from "@/components/Card";
import { StorsteUtslipp } from "@/components/StorsteUtslipp";
import { Scope14Bar } from "@/components/Scope1-4Bar";
import { ChartPieDonutText } from "@/components/ScopePie";
import { TimeArea } from "@/components/TimeArea";

export default function Home() {
  return (
    <div>
      <div className="bg-foreground h-20 w-full"></div>
      <div className="flex flex-col items-center justify-center mx-auto w-full max-w-6xl mt-20 bg-white p-6 rounded-sm shadow-sm gap-4">
        <h1 className="text-2xl font-medium text-center mt-4">Mitt klimaregnskap</h1>
        <p className="text-sm text-gray-500 mb-4">
          De viktigste tallene for 2024
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 shadow-sm">
            <Metric label="Avfall totalt" value="59694" unit="tonn" />
          </div>
          <div className="col-span-1 shadow-sm">
            <Metric label="Avfall/innbygger" value="449" unit="kg" />
          </div>
          <div className="col-span-1 shadow-sm">
            <Metric
              label="Klimagevinst totalt"
              value="107"
              unit="kgCO2e"
            />
          </div>
          <div className="col-span-1 shadow-sm">
            <Metric
              label="Klimagevinst/tonn avfall"
              value="107"
              unit="kgCO2e"
            />
          </div>
          <div className="col-span-2 shadow-sm">
            <ChartPieDonutText />
          </div>
          <div className="col-span-2 shadow-sm">
            <Scope14Bar />
          </div>
          <div className="col-span-2 shadow-sm">
            <StorsteUtslipp />
          </div>
          <div className="col-span-2 shadow-sm">
            <TimeArea />
          </div>
          <div className="col-span-3 max-h-[500px] shadow-sm">
            <ChartBarDefault />
          </div>
        </div>
      </div>
    </div>
  );
}
