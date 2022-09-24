const useCreateHistory = () => {
  const history = ref({
    performer_id: '',
    history_type_id: '',
    from_account_id: '',
    to_account_id: '',
    memo: '',
    amount: '',
    created_history_at: '',
  });
  return {history};
};
export default useCreateHistory;
