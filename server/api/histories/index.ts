import crypto from 'crypto';

const createGetResponse = () => ([
  {
    id: 1,
    performer_id: '1',
    history_type_id: '2',
    from_account_id: '6',
    to_account_id: '3',
    memo: 'Ăn sáng',
    amount: 400000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 2,
    performer_id: '2',
    history_type_id: '1',
    from_account_id: '1',
    to_account_id: '2',
    memo: 'Lương ba',
    amount: 300000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 3,
    performer_id: '1',
    history_type_id: '0',
    from_account_id: '4',
    to_account_id: '3',
    memo: 'Học phí',
    amount: 200000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 4,
    performer_id: '2',
    history_type_id: '0',
    from_account_id: '3',
    to_account_id: '1',
    memo: 'Tiền điện tháng 8',
    amount: 100000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 5,
    performer_id: '3',
    history_type_id: '2',
    from_account_id: '4',
    to_account_id: '2',
    memo: 'Ăn sáng',
    amount: 400000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 6,
    performer_id: '2',
    history_type_id: '1',
    from_account_id: '2',
    to_account_id: '5',
    memo: 'Lương ba',
    amount: 300000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 7,
    performer_id: '1',
    history_type_id: '0',
    from_account_id: '4',
    to_account_id: '2',
    memo: 'Học phí',
    amount: 200000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
  {
    id: 8,
    performer_id: crypto.randomUUID(),
    history_type_id: '0',
    from_account_id: '1',
    to_account_id: '6',
    memo: 'Tiền điện tháng 8',
    amount: 100000,
    created_history_at: '2022-08-05T16:04:43.967Z',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
]);

const validationErrorResponses = () => ({
  amount: [
    'Số tiền không bao gồm ký tự',
    'Số tiền không bao gồm ký tự',
  ],
});
const createPostResponse = () => ({
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req);
    if (body.amount === '1') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return validationErrorResponses();
    }
    return createPostResponse();
  }
  return createGetResponse();
});
