"use client";

import { ChartAreaLegend } from "@/components/AreaChart";
import { ChartBarHorizontal } from "@/components/BarChart";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <ChartBarHorizontal />
      <ChartAreaLegend />
    </div>
  );
}
