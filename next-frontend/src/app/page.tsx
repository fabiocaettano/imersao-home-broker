import { Button, TableCell, TableRow, Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

export default function MyAssetsList() {
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>
      <div className="overflox-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ativo</TableCell>
              <TableCell>Cotação</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>
                <Button color="Ligth">Comprar/Vender</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>    
    </div>
  );
}
