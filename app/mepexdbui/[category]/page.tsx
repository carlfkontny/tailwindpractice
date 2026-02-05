"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Type definitions
type PlukkanalyseRow = {
  id: number;
  kategori: string;
  prosent: number;
  tonn: number;
  år: number;
};

type UtslippsfaktorRow = {
  id: number;
  kategori: string;
  kgCO2ePerTonn: number;
  kilde: string;
  år: number;
};

type KommuneinfoRow = {
  id: number;
  kommunenr: string;
  navn: string;
  innbyggere: number;
  areal: number;
  region: string;
};

type DataRow = PlukkanalyseRow | UtslippsfaktorRow | KommuneinfoRow;

// Sample data for each category
const categoryData: Record<string, DataRow[]> = {
  plukkanalyser: [
    { id: 1, kategori: "Papir", prosent: 25.3, tonn: 2800, år: 2024 },
    { id: 2, kategori: "Plast", prosent: 18.7, tonn: 2070, år: 2024 },
    { id: 3, kategori: "Glass", prosent: 12.1, tonn: 1340, år: 2024 },
    { id: 4, kategori: "Metall", prosent: 8.9, tonn: 985, år: 2024 },
    { id: 5, kategori: "Organisk", prosent: 22.4, tonn: 2480, år: 2024 },
    { id: 6, kategori: "Andre", prosent: 12.6, tonn: 1395, år: 2024 },
    { id: 7, kategori: "Papir", prosent: 24.8, tonn: 2650, år: 2023 },
    { id: 8, kategori: "Plast", prosent: 19.2, tonn: 2050, år: 2023 },
    { id: 9, kategori: "Glass", prosent: 11.9, tonn: 1270, år: 2023 },
    { id: 10, kategori: "Metall", prosent: 9.1, tonn: 970, år: 2023 },
    { id: 11, kategori: "Organisk", prosent: 21.8, tonn: 2330, år: 2023 },
    { id: 12, kategori: "Andre", prosent: 13.2, tonn: 1410, år: 2023 },
  ],
  utslippsfaktorer: [
    { id: 1, kategori: "Papir", kgCO2ePerTonn: 450, kilde: "IPCC", år: 2024 },
    { id: 2, kategori: "Plast", kgCO2ePerTonn: 2100, kilde: "IPCC", år: 2024 },
    { id: 3, kategori: "Glass", kgCO2ePerTonn: 320, kilde: "IPCC", år: 2024 },
    { id: 4, kategori: "Metall", kgCO2ePerTonn: 1800, kilde: "IPCC", år: 2024 },
    {
      id: 5,
      kategori: "Organisk",
      kgCO2ePerTonn: 280,
      kilde: "IPCC",
      år: 2024,
    },
    {
      id: 6,
      kategori: "Elektronikk",
      kgCO2ePerTonn: 3500,
      kilde: "IPCC",
      år: 2024,
    },
    { id: 7, kategori: "Papir", kgCO2ePerTonn: 445, kilde: "IPCC", år: 2023 },
    { id: 8, kategori: "Plast", kgCO2ePerTonn: 2080, kilde: "IPCC", år: 2023 },
    { id: 9, kategori: "Glass", kgCO2ePerTonn: 315, kilde: "IPCC", år: 2023 },
    {
      id: 10,
      kategori: "Metall",
      kgCO2ePerTonn: 1790,
      kilde: "IPCC",
      år: 2023,
    },
    {
      id: 11,
      kategori: "Organisk",
      kgCO2ePerTonn: 275,
      kilde: "IPCC",
      år: 2023,
    },
    {
      id: 12,
      kategori: "Elektronikk",
      kgCO2ePerTonn: 3480,
      kilde: "IPCC",
      år: 2023,
    },
  ],
  kommuneinfo: [
    {
      id: 1,
      kommunenr: "0301",
      navn: "Oslo",
      innbyggere: 709037,
      areal: 454,
      region: "Oslo",
    },
    {
      id: 2,
      kommunenr: "1201",
      navn: "Bergen",
      innbyggere: 291189,
      areal: 465,
      region: "Vestland",
    },
    {
      id: 3,
      kommunenr: "5001",
      navn: "Trondheim",
      innbyggere: 212660,
      areal: 528,
      region: "Trøndelag",
    },
    {
      id: 4,
      kommunenr: "1103",
      navn: "Stavanger",
      innbyggere: 149048,
      areal: 262,
      region: "Rogaland",
    },
    {
      id: 5,
      kommunenr: "1505",
      navn: "Bærum",
      innbyggere: 129874,
      areal: 192,
      region: "Viken",
    },
    {
      id: 6,
      kommunenr: "3001",
      navn: "Kristiansand",
      innbyggere: 116986,
      areal: 276,
      region: "Agder",
    },
    {
      id: 7,
      kommunenr: "1106",
      navn: "Sandnes",
      innbyggere: 83554,
      areal: 304,
      region: "Rogaland",
    },
    {
      id: 8,
      kommunenr: "4601",
      navn: "Tromsø",
      innbyggere: 77992,
      areal: 2521,
      region: "Troms og Finnmark",
    },
    {
      id: 9,
      kommunenr: "5006",
      navn: "Ålesund",
      innbyggere: 67947,
      areal: 632,
      region: "Møre og Romsdal",
    },
    {
      id: 10,
      kommunenr: "0302",
      navn: "Drammen",
      innbyggere: 102273,
      areal: 137,
      region: "Viken",
    },
    {
      id: 11,
      kommunenr: "1507",
      navn: "Asker",
      innbyggere: 95089,
      areal: 100,
      region: "Viken",
    },
    {
      id: 12,
      kommunenr: "5007",
      navn: "Molde",
      innbyggere: 32002,
      areal: 1503,
      region: "Møre og Romsdal",
    },
  ],
};

const categoryConfig: Record<string, { title: string; columns: string[] }> = {
  plukkanalyser: {
    title: "Plukkanalyser",
    columns: ["kategori", "prosent", "tonn", "år"],
  },
  utslippsfaktorer: {
    title: "Utslippsfaktorer",
    columns: ["kategori", "kgCO2ePerTonn", "kilde", "år"],
  },
  kommuneinfo: {
    title: "Kommuneinfo",
    columns: ["kommunenr", "navn", "innbyggere", "areal", "region"],
  },
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const config = categoryConfig[category];
  const data = useMemo(() => categoryData[category] || [], [category]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply filter
    if (filter) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (sortConfig.direction === "asc") {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    // Return first 10 rows
    return result.slice(0, 10);
  }, [data, filter, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") {
          return { key, direction: "desc" };
        }
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const formatColumnName = (key: string) => {
    const names: Record<string, string> = {
      kategori: "Kategori",
      prosent: "Prosent (%)",
      tonn: "Tonn",
      år: "År",
      kgCO2ePerTonn: "kg CO₂e/tonn",
      kilde: "Kilde",
      kommunenr: "Kommunenr",
      navn: "Navn",
      innbyggere: "Innbyggere",
      areal: "Areal (km²)",
      region: "Region",
    };
    return names[key] || key;
  };

  const formatCellValue = (value: string | number | null | undefined) => {
    if (typeof value === "number") {
      if (value > 1000) {
        return value.toLocaleString("no-NO");
      }
      return value.toLocaleString("no-NO", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
    }
    return value;
  };

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Kategori ikke funnet</h1>
        <Button onClick={() => router.push("/mepexdbui")}>Tilbake</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/mepexdbui")}
          className="mb-4"
        >
          ← Tilbake
        </Button>
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <p className="text-muted-foreground">
          Viser første 10 rader. Bruk filteret under for å søke i dataene.
        </p>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Søk i alle kolonner..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {config.columns.map((column) => (
                <TableHead key={column}>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column)}
                    className="h-8 p-0 font-semibold hover:bg-transparent"
                  >
                    {formatColumnName(column)}
                    {getSortIcon(column)}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={config.columns.length}
                  className="text-center text-muted-foreground"
                >
                  Ingen resultater funnet
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((row) => (
                <TableRow key={row.id}>
                  {config.columns.map((column) => (
                    <TableCell key={column}>
                      {formatCellValue(row[column])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Viser {filteredAndSortedData.length} av {data.length} total rader
        {filter && ` (filtrert)`}
      </div>
    </div>
  );
}






