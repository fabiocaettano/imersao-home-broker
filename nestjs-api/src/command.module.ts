import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { WalletsModule } from './wallets/wallets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import {
  ConfirmGenerateOrders,
  ConfirmGenerateOrdersClosed,
  SimulateAssetsPriceCommand,
} from './simulate-assets-price.command';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB}`, {
      serverSelectionTimeoutMS: 60000, // 60 segundos
    }),
    AssetsModule,
    WalletsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SimulateAssetsPriceCommand,
    ConfirmGenerateOrders,
    ConfirmGenerateOrdersClosed,
  ],
})
export class CommandModule {}