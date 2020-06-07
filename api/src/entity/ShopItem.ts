import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
