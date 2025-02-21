import { Asset, AssetDaily, Wallet, Order } from "../models";

export async function getAssets(): Promise<Asset[]> {
  const response = await fetch(`${process.env.NEST_PUBLIC_API_BASE_URL}/assets`);
  return response.json();
}

export async function getMyWallet(walletId: string): Promise<Wallet> {
    const response = await fetch(`${process.env.NEST_PUBLIC_API_BASE_URL}/wallets/${walletId}`);
  
    /*if (!response.ok) {
      return null;
    }*/
  
    return response.json();
  }
  
export async function getOrders(walletId: string): Promise<Order[]> {
  const response = await fetch(
    `${process.env.NEST_PUBLIC_API_BASE_URL}/orders?walletId=${walletId}`
  );
  return response.json();
}

export async function getAssetDailies(
  assetSymbol: string
): Promise<AssetDaily[]> {
  const response = await fetch(
    `${process.env.NEST_PUBLIC_API_BASE_URL}/${assetSymbol}/dailies`
  );
  return response.json();
}