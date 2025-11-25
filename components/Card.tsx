'use client'

import { TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";


export function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit: string;
}) {
  return (
    <div className="flex flex-col gap-4 shadow-sm p-4 rounded-sm bg-card overflow-hidden">
      <div className="text-muted-foreground flex flex-row gap-4 items-center w-full justify-between">
        {label}
        <Badge className="bg-green-500 text-white" variant="default">
          <TrendingUp className="w-4 h-4" /> +12%
        </Badge>
      </div>
      <div className="text-3xl font-bold text-black" title={value.toString() + " " + unit}>
        {Math.round(Number(value)).toLocaleString()}{" "}
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="text-xs text-muted-foreground flex flex-row gap-4 items-center">
        <span>Stigende trend</span> <TrendingUp className="w-4 h-4" />
      </div>
    </div>
  );
}