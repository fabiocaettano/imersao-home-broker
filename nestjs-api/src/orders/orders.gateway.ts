import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class OrdersGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    client.emit('response', { name: 'ok' });
    console.log(payload);
  }
}
