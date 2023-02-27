import request from '../utils/index';

export const getBooksData = (params) => request({
  url: 'books/v1/volumes',
  method: 'get',
  params
})