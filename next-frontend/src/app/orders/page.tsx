import { Button, TableCell, TableRow, Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { Order } from "../../models";
import { AssetShow } from "@/components/AssetShow";
import { OrderTypeBadge } from "@/components/OrderTypeBadge";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";

export async function getOrders( walletId: string): Promise<Order[]>{
  const response = await fetch(
    `${process.env.NEST_PUBLIC_API_BASE_URL}/orders?walletId=${walletId}`
  );
  return response.json();
}

export default async function OrdersListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id }  = await searchParams;
  const orders =  getOrders(wallet_id);
  
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minhas Ordens</h1>
      </article>
      <div className="overflox-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>            
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody>            
            {(await orders).map((order, key ) => (
              <TableRow key={key}>
                <TableCell>
                  <AssetShow asset={order.asset}/>                
                </TableCell>  
                <TableCell>
                  R$ {order.price}
                </TableCell>                
                <TableCell>
                  {order.shares}
                </TableCell>
                <TableCell>
                  <OrderTypeBadge type = {order.type} />
                </TableCell>                
                <TableCell>
                  <OrderStatusBadge status = {order.status} />
                </TableCell>                
              </TableRow>
            ))}
          </TableBody> 
        </Table>
      </div>    
    </div>
  );
}
