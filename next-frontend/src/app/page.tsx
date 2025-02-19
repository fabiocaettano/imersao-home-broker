import { Button, TableCell, TableRow, Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { Wallet } from "../models";
import Image from "next/image";

export async function getMyWallet(walletId: string): Promise<Wallet>{
  const response = await fetch(`${process.env.NEST_PUBLIC_API_BASE_URL}/wallets/${walletId}`);
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
                <TableCell>
                  <div className="flex space x-1">
                    <div className="content-center">
                      <Image                        
                        src={walletAsset.asset.image_url}                      
                        alt={walletAsset.asset.symbol}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>{walletAsset.asset.name} </span>
                      <span>{walletAsset.asset.symbol} </span>
                    </div>
                  </div>
                </TableCell>
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
