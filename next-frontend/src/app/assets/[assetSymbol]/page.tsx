import { Card, Tabs } from "flowbite-react";
import { AssetShow } from "../../../components/AssetShow";
import { Asset, OrderType } from "../../../models";
import { TabsItem } from "../../../components/Tabs";
import { OrderForm } from "../../../components/OrderForm";
import { AssetChartComponent } from "./AssetChatComponen";
import { Wallet } from "../../../models";
import { WalletList } from "../../../components/WalletList";
import { AssetPrice } from "./AssetPrice";

export async function getAsset(symbol: string): Promise<Asset> {
  const response = await fetch(`${process.env.NEST_PUBLIC_API_BASE_URL}/assets/${symbol}`);
  return response.json();
}

export async function getMyWallet(walletId: string): Promise<Wallet> {
    const response = await fetch(`${process.env.NEST_PUBLIC_API_BASE_URL}/wallets/${walletId}`);
  
    /*if (!response.ok) {
      return null;
    }*/
  
    return response.json();
  }
  
export default async function AssetDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { assetSymbol } = await params;
  const { wallet_id: walletId } = await searchParams;

  if (!walletId) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(walletId);

  if (!wallet) {
    return <WalletList />;
  }

  const asset = await getAsset(assetSymbol);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetShow asset={asset} />
        <AssetPrice asset={asset} />
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabsItem
                active
                title={<div className="text-blue-700">Comprar</div>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.BUY}
                />
              </TabsItem>
              <TabsItem title={<div className="text-red-700">Venda</div>}>
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.SELL}
                />
              </TabsItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} />
        </div>
      </div>
    </div>
  );
}