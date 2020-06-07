import { getConnection, Repository } from 'typeorm';

import { ShopItem } from '../entity/ShopItem';

class ShopItemService {
  readonly repository: Repository<ShopItem>;

  constructor() {
    this.repository = getConnection().getRepository('ShopItem');
  }

  async get(name: string): Promise<ShopItem> {
    return await this.repository.findOne({ where: { name } });
  }

  async add(name: string): Promise<ShopItem> {
    const shopItem = new ShopItem();

    shopItem.name = name;

    return await this.repository.save(shopItem);
  }
}

export default ShopItemService;
