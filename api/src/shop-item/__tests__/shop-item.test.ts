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

  it('should add unexisting shop-item and return it', async () => {
    const result = await factory.app.get('/shop-item?name=pomme');

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject({ name: 'pomme' });
  });

  it('should find existing shop-item', async () => {
    const shopItem: ShopItem = await new ShopItemService().add('pomme');

    const result = await factory.app.get('/shop-item?name=pomme');

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(shopItem);
  });

  it('should find existing shop-item case insensitive', async () => {
    const shopItem: ShopItem = await new ShopItemService().add('pomme');

    const result = await factory.app.get('/shop-item?name=PoMme');

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(shopItem);
  });

  it('should find existing shop-item accent insensitive', async () => {
    const shopItem: ShopItem = await new ShopItemService().add('comté');

    const result = await factory.app.get('/shop-item?name=comté');

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(shopItem);
  });
});
