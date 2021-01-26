import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface OwnersAPI extends Collection {
  items: Owners;
}

export type Owners = Array<Owner>;

export interface Owner extends Item {
  getUrlApi: string;
  diffUrlApi: string;
  deletedField: string;
  fields: string[];
  idField: string;
  name: string;
  pageSize: number;
}
