import { ShopItem } from 'src/entity/ShopItem';
import { TestFactory } from 'src/testing/factory';

import ShopItemService from '../shop-item-service';

describe('GET /shop-item', () => {
  let factory: TestFactory;

  beforeEach(async () => {
    factory = new TestFactory();
    await factory.init();
  });

  afterEach(async () => {
    await factory.close();
  });

  it('should not find unexisting shop-item', async () => {
    const result = await factory.app.get('/shop-item?name=pomme');

    expect(result.status).toEqual(404);
  });

  it('should find existing shop-item', async () => {
    const shopItem: ShopItem = await new ShopItemService().add('pomme');

    const result = await factory.app.get('/shop-item?name=pomme');

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(shopItem);
  });
});
