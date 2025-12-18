import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPIProps {
  title: string;
  value: string | number;
  unit: string;
  description?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  increaseIsGood?: boolean;
}

export function KPI({
  title,
  value,
  unit,
  description,
  trend,
  increaseIsGood = false,
}: KPIProps) {
  const getBadgeColor = () => {
    if (!trend) return "";
    const isPositive = trend.isPositive === true;
    // If increaseIsGood is true, invert the logic: positive trend = green, negative = red
    // If increaseIsGood is false, keep current logic: positive trend = red, negative = green
    if (increaseIsGood) {
      return isPositive
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
    } else {
      return isPositive
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700";
    }
  };

  return (
    <Card className="col-span-1 relative overflow-hidden hover:shadow-lg transition-shadow duration-200 border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {trend && (
          <Badge className={`flex items-center gap-1 ${getBadgeColor()}`}>
            {trend.isPositive === true ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.value > 0 ? "+" : ""}
            {trend.value}%
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {value} <span className="text-sm">{unit}</span>
        </div>
        {description && (
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
