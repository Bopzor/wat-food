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

  describe('/', () => {
    it('should add unexisting shop-item and return it', async () => {
      const result = await factory.app.get('/shop-item?name=pomme');

      expect(result.status).toEqual(200);
      expect(result.body).toMatchObject({ name: 'pomme' });
    });

    it('should find existing shop-item', async () => {
      const shopItem: ShopItem = await new ShopItemService().add('pomme');
      delete shopItem.latinize;

      const result = await factory.app.get('/shop-item?name=pomme');

      expect(result.status).toEqual(200);
      expect(result.body).toMatchObject(shopItem);
    });

    it('should find existing shop-item case insensitive', async () => {
      const shopItem: ShopItem = await new ShopItemService().add('pomme');
      delete shopItem.latinize;

      const result = await factory.app.get('/shop-item?name=PoMme');

      expect(result.status).toEqual(200);
      expect(result.body).toMatchObject(shopItem);
    });

    it('should find existing shop-item accent insensitive', async () => {
      const shopItem: ShopItem = await new ShopItemService().add('comté');
      delete shopItem.latinize;

      const result = await factory.app.get('/shop-item?name=comté');

      expect(result.status).toEqual(200);
      expect(result.body).toMatchObject(shopItem);
    });
  });

  describe('/search', () => {
    it('should send empty array if no match', async () => {
      const result = await factory.app.get('/shop-item/search?name=sponge');

      expect(result.status).toEqual(200);
      expect(result.body).toEqual([]);
    });

    it('should send matched results', async () => {
      const shopItem1: ShopItem = await new ShopItemService().add('blé');
      delete shopItem1.latinize;
      const shopItem2: ShopItem = await new ShopItemService().add('bleu');
      delete shopItem2.latinize;

      const result = await factory.app.get('/shop-item/search?name=bl');

      expect(result.status).toEqual(200);
      expect(result.body).toMatchObject([shopItem1, shopItem2]);
    });
  });
});
