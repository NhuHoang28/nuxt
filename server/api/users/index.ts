const createGetResponse = () => ([
  {
    id: '5',
    username: 'Như',
    fullname: 'Harry Potter',
    password: 'abcxyz',
    email: 'email@example.com',
    group_id: '12332111',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: '1',
    username: 'Bố',
    fullname: 'Harry Potter',
    password: 'abcxyz',
    email: 'email@example.com',
    group_id: '12332111',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: '2',
    username: 'Mẹ',
    fullname: 'Harry Potter',
    password: 'abcxyz',
    email: 'email@example.com',
    group_id: '12332111',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: '3',
    username: 'My',
    fullname: 'Harry Potter',
    password: 'abcxyz',
    email: 'email@example.com',
    group_id: '12332111',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
]);

const createPostResponse = () => ({
  api_token: 'beareAuthApiToken',
});

const ValidationErrorResponses = () => ({
  username: [
    'Tên đăng nhập đã tồn tại',
    'Tên đăng nhập đã tồn tại',
  ],
  email: [
    'Tên đăng nhập đã tồn tại',
    'Tên đăng nhập đã tồn tại',
  ],
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req);
    if (body.username === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return createPostResponse();
  }

  return createGetResponse();
});
