import { Owners } from '../owners.interface';

export const owners: Owners = [
  {
    getUrlApi: `/owner`,
    diffUrlApi: `/owner/diff`,
    deletedField: 'deleted',
    fields: ['id', 'name', 'email', 'phone', 'address', 'birthday'],
    idField: 'id',
    name: 'owner',
    pageSize: 1,
  },
  {
    getUrlApi: `/pet`,
    diffUrlApi: `/pet/diff`,
    deletedField: 'deleted',
    fields: [
      'id',
      'name',
      'nickName',
      'ownerId',
      'breed',
      'size',
      'birthday',
      'species',
    ],
    idField: 'id',
    name: 'pet',
    pageSize: 1,
  },
];
