import { Owners } from '../owners.interface';

export const schemas: Owners = [
  {
    id: '1',
    getUrlApi: `/owner`,
    diffUrlApi: `/owner/diff`,
    deletedField: 'deleted',
    fields: ['id', 'name', 'email', 'phone', 'address', 'birthday', 'aaa'],
    idField: 'id',
    name: 'owner',
    pageSize: 1,
    createdDate: '2020-10-06T12:40:54.865Z',
    updatedDate: '2021-01-26T20:19:00.280Z',
  },
  {
    id: '2',
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
    createdDate: '2020-10-06T12:40:54.865Z',
    updatedDate: '2020-10-06T12:40:54.865Z',
  },
];
