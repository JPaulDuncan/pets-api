import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface PetsAPI extends Collection {
  items: Pets;
}

export type Pets = Array<Pet>;

export interface Pet extends Item {
  id?: string;
  name?: string;
  nickName?: string;
  ownerId?: string;
  breed?: number;
  size?: number;
  birthday?: number;
  species?: number;
}