import { Asset } from './entities/asset.entity';

export class AssetPresenter{
    constructor(private asset: Asset){}

    toJSON(){
        return {
            _id: this.asset._id,
            name: this.asset.name,
            synbol: this.asset.symbol,
            price: this.asset.price,
            image_url: `http://137.184.66.18:9000/${this.asset.image}`,
        };
    }
}