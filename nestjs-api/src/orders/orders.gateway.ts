import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { OrderType } from './entities/order.entity';

@WebSocketGateway()
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}
  @SubscribeMessage('orders/create')
  async handleMessage(
    client: any,
    payload: {
      walletId: string;
      assetId: string;
      shares: number;
      price: number;
      type: OrderType;
    },
  ) {
    const order = await this.ordersService.create({
      walletId: payload.walletId,
      assetId: payload.assetId,
      shares: payload.shares,
      price: payload.price,
      type: payload.type,
    });
    return order;
  }
}
