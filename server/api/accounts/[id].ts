import crypto from 'crypto';

const createGetResponse = () => ({
  id: crypto.randomUUID(),
  group_id: crypto.randomUUID(),
  user_id: crypto.randomUUID(),
  accont_type_id: crypto.randomUUID(),
  name: 'Agribank',
  amount: 100000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
});
const ValidationErrorResponses = () => ({
  name: [
    'Tên tài khoản ngân hàng đã tồn tại',
    'Tên tài khoản ngân hàng đã tồn tại',
  ],
});
const DelResponses = () => ({
  message: 'Tài khoản không được tìm thấy',
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req);
    if (body.name === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    if (body.name === '1') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 401;
      return {message: 'Tài khoản không được tìm thấy'};
    }
    return {};
  }
  if (isMethod(event.req, 'DELETE')) {
    // eslint-disable-next-line no-param-reassign
    // event.res.statusCode = 404;
    return DelResponses();
  }
  return createGetResponse();
});
