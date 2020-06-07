import latinize from 'latinize';
import { getConnection, Like, Repository } from 'typeorm';

import { ShopItem } from '../entity/ShopItem';

class ShopItemService {
  readonly repository: Repository<ShopItem>;

  constructor() {
    this.repository = getConnection().getRepository('ShopItem');
  }

  async get(name: string): Promise<ShopItem> {
    const shopItem: ShopItem = await this.repository.findOne({
      select: ['name', 'id'],
      where: { latinize: latinize(name) },
    });

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

  async search(name: string): Promise<ShopItem[]> {
    try {
      return await this.repository.find({ select: ['name', 'id'], where: { latinize: Like(`%${latinize(name)}%`) } });
    } catch (error) {
      console.log(error);
    }
  }
}

export default ShopItemService;
