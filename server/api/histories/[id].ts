const createGetResponse = () => ({
  id: 2,
  performer_id: '2',
  history_type_id: '1',
  from_account_id: '1',
  to_account_id: '2',
  memo: 'Lương ba',
  amount: 300000,
  created_history_at: 'Aug 24 2022',
  created_at: '2022-08-05T16:04:43.967Z',
  updated_at: '2022-08-05T16:04:43.967Z',
});
// const ValidationErrorResponses = () => ([
//   {
//     field: 'amount',
//     message: 'Số tiền không bao gồm ký tự',
//   },
// ]);
const ValidationErrorResponses = () => ({
  amount: [
    'Số tiền không bao gồm ký tự',
    'Số tiền không bao gồm ký tự',
  ],
});
const DelResponses = () => ({
  message: 'Tài khoản không được tìm thấy',
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req);
    if (body.amount === '1') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    if (body.amount === '11') {
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
