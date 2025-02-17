import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Asset {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  image: string;

  @Prop()
  price: string;

  createdAt!: Date;
  updatedAt!: Date;
}
