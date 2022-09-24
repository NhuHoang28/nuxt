import crypto from 'crypto';

const createGetResponse = () => ({
  id: 'thunhu',
  username: 'kitty',
  fullname: 'Harry Potter',
  password: 'abcxyz',
  email: 'email@example.com',
  group_id: '12332111',
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
});
const createPutResponse = () => ({
  id: crypto.randomUUID(),
  username: 'kitty',
  fullname: 'Như Hoàng',
  password: 'abcxyz',
  email: 'email@example.com',
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
  group_id: '123321',
});
const validationErrorResponses = () => ({
  fullname: [
    'Họ và tên không được để trống',
    'Họ và tên không được để trống',
  ],
  email: [
    'Mã nhóm không được đổi',
    'Mã nhóm không được đổi',
  ],
});

export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req);
    if (body.fullname === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return validationErrorResponses();
    }
    return createPutResponse();
  }
  return createGetResponse();
});
