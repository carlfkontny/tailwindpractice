import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    scope: "1",
    kategori: "Direkteutslipp fra egne kjøretøy",
    utslipp: "250.00",
  },
  {
    scope: "1",
    kategori: "Avfallsforbrenning",
    utslipp: "250.00",
  },
  {
    scope: "2",
    kategori: "Kjøpt strøm",
    utslipp: "150.00",
  },
  {
    scope: "3",
    kategori: "Transport",
    utslipp: "350.00",
  },
  {
    scope: "3",
    kategori: "Innkjøp av produkter og tjenester",
    utslipp: "350.00",
  },
];
export function TabellUtslipp() {
  return (
    <Table>
      <TableCaption>Utslipp i 2025</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Scope</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead className="text-right">Utslipp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.scope}>
            <TableCell className="font-medium">{invoice.scope}</TableCell>
            <TableCell>{invoice.kategori}</TableCell>
            <TableCell className="text-right">{invoice.utslipp} tonn CO<sub>2</sub>e</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {invoices.reduce(
              (acc, invoice) => acc + parseFloat(invoice.utslipp),
              0
            )}{" "}
            tonn CO<sub>2</sub>e
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
