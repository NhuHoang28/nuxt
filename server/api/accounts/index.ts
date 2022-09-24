import crypto from 'crypto';

const createGetResponse = () => ([{
  id: '1',
  group_id: crypto.randomUUID(),
  user_id: '',
  accont_type_id: crypto.randomUUID(),
  name: 'BIDV',
  amount: 100000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
},
{
  id: '2',
  group_id: crypto.randomUUID(),
  user_id: '',
  accont_type_id: crypto.randomUUID(),
  name: 'Agribank',
  amount: 100000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
},
{
  id: '3',
  group_id: crypto.randomUUID(),
  user_id: '1',
  accont_type_id: crypto.randomUUID(),
  name: 'Như',
  amount: 100000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
},
{
  id: '4',
  group_id: crypto.randomUUID(),
  user_id: '3',
  accont_type_id: crypto.randomUUID(),
  name: 'My',
  amount: 100000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
},
{
  id: '5',
  group_id: crypto.randomUUID(),
  user_id: '',
  accont_type_id: crypto.randomUUID(),
  name: 'Quỹ chung',
  amount: 700000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
},
{
  id: '6',
  group_id: crypto.randomUUID(),
  user_id: '',
  accont_type_id: crypto.randomUUID(),
  name: 'Sacombank',
  amount: 700000,
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
},
]);

const ValidationErrorResponses = () => ({
  name: [
    'Tên tài khoản ngân hàng đã tồn tại',
    'Tên tài khoản ngân hàng đã tồn tại',
  ],
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req);
    if (body.name === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return {};
  }
  // eslint-disable-next-line no-param-reassign
  // event.res.statusCode = 403;
  // return {message: 'Không thuộc quyền truy cập'};
  return createGetResponse();
});
