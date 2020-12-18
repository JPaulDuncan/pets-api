import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface OwnersAPI extends Collection {
  items: Owners;
}

export type Owners = Array<Owner>;

export interface Owner extends Item {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  birthday?: number;
}