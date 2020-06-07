import latinize from 'latinize';
import { getConnection, Repository } from 'typeorm';

import { ShopItem } from '../entity/ShopItem';

class ShopItemService {
  readonly repository: Repository<ShopItem>;

  constructor() {
    this.repository = getConnection().getRepository('ShopItem');
  }

  async get(name: string): Promise<ShopItem> {
    const shopItem: ShopItem = await this.repository.findOne({ where: { latinize: latinize(name) } });

    if (!shopItem) {
      return await this.add(name);
    }

    return shopItem;
  }

  async add(name: string): Promise<ShopItem> {
    const shopItem = new ShopItem();

    shopItem.name = name;
    shopItem.latinize = latinize(name);

    return await this.repository.save(shopItem);
  }
}

export default ShopItemService;
