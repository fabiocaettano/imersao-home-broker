import { Button, TableCell, TableRow, Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { Wallet } from "../models";

export async function getMyWallet(walletId: string): Promise<Wallet>{
  const response = await fetch(`http://161.35.14.56:3000/wallets/${walletId}`);
  return response.json();
}

export default async function MyAssetsList({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id }  = await searchParams;
  const wallet =  getMyWallet(wallet_id);
  console.log((await wallet).assets);
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
            {(await wallet).assets.map((walletAsset, key ) => (
              <TableRow key={key}>
                <TableCell>{walletAsset.asset.name}</TableCell>
                <TableCell>{walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button color="blue">Comprar/Vender</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> 
        </Table>
      </div>    
    </div>
  );
}
