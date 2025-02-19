import { Button, TableCell, TableRow, Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { Wallet } from "../../models";
import Image from "next/image";

export async function getAssets(): Promise<Wallet>{
  const response = await fetch(`${process.env.NEST_PUBLIC_API_BASE_URL}/assets`);
  return response.json();
}

export default async function AssetsListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  //const { wallet_id }  = await searchParams;
  const assets =  getAssets();
  
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Ativos</h1>
      </article>
      <div className="overflox-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>            
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>            
            {(await assets).map((asset, key ) => (
              <TableRow key={key}>
                <TableCell>
                  <div className="flex space x-1">
                    <div className="content-center">
                      <Image                        
                        src={asset.image_url}                      
                        alt={asset.symbol}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>{asset.name} </span>
                      <span>{asset.symbol} </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>R$ {asset.price}</TableCell>
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
