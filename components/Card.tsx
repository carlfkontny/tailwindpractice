"use client";

import { TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
} from "./ui/card";
import { description } from "./BarChart";

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
    <Card className="@container/card border-none shadow-none">
      <CardHeader>
        <CardDescription className="text-xs text-gray-700">{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold">
          {Number(value).toLocaleString()} <span className="text-sm text-gray-700">{unit}</span>
        </CardTitle>

        <CardAction>
          <Badge variant="outline">
            <TrendingUp className="size-4" />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Bedre enn forrige år <TrendingUp className="size-4" />
        </div>
        
      </CardFooter>
    </Card>
  );
}
