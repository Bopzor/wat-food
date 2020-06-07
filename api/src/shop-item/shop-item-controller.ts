import express, { NextFunction, Request, Response, Router } from 'express';

import { ShopItem } from '../entity/ShopItem';

import ShopItemService from './shop-item-service';

class ItemController {
  private shopItemService: ShopItemService;
  private _router: Router = express.Router();

  constructor() {
    this.shopItemService = new ShopItemService();

    this.init();
  }

  get router(): Router {
    return this._router;
  }

  getShopItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.query;

    const item: ShopItem = await this.shopItemService.get((name as string).toLowerCase());

    if (!item) {
      res.status(404).send(`${name as string} not found.`);
    } else {
      res.status(200).send(item);
    }

    next();
  };

  init(): void {
    this._router.get('/', this.getShopItem);
  }
}

export default ItemController;
