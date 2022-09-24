<template>
  <BContainer>
    <BRow class="mt-3 title">
      <BCol class="text-center">
        <h2>Chuyển tiền</h2>
      </BCol>
    </BRow>
    <BRow class="mt-5">
      <BCol>
        <form @submit.prevent="submit">
          <BRow>
            <BCol>
              <div role="group">
                <BFormInput
                  id="input-live"
                  v-model="history.amount"
                  type="number"
                  :state="validationErrorMessages.amount === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Số tiền"
                  required
                  trim
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.amount" />
                </BFormInvalidFeedback>
              </div>
            </BCol>
          </BRow>
          <BRow>
            <BCol>
              <select
                v-model="history.performer_id"
                class="form-select"
                required
              >
                <option value="" disabled selected>Người chuyển</option>
                <option
                  v-for="user in dataUsers"
                  :key="user.id" :value="user.id"
                >
                  {{ user.fullname }}
                </option>
              </select>
            </BCol>
          </BRow>
          <BRow>
            <BCol cols="6" class="pe-0">
              <select
                v-model="history.from_account_id"
                class="form-select"
                required
              >
                <option value="" disabled selected>Nguồn chuyển</option>
                <option
                  v-for="account in fromAccounts"
                  :key="account.id" :value="account.id"
                >
                  {{ account.name }}
                </option>
              </select>
            </BCol>
            <BCol cols="6">
              <select
                v-model="history.to_account_id"
                required
                class="form-select"
              >
                <option value="" disabled selected>Nguồn nhận</option>
                <option
                  v-for="account in toAccounts"
                  :key="account.id" :value="account.id"
                >
                  {{ account.name }}
                </option>
              </select>
            </BCol>
          </BRow>
          <BRow>
            <BCol>
              <Datepicker v-model="history.created_history_at" placeholder="Ngày chuyển tiền" />
            </BCol>
          </BRow>
          <BRow>
            <BCol>
              <BFormInput
                v-model="history.memo"
                placeholder=" Nội dung"
                class="mt-2 mb-2"
              />
            </BCol>
          </BRow>
          <SubmitButton :content="'Lưu'" :color="'#fc9999'" class="mt-5" />
        </form>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

definePageMeta({
  middleware: 'authenticated',
  layout: 'page',
});

const {history} = useCreateHistory();
const {getConfig} = useConfig();
const accounts = ref([]);
let fromAccounts = reactive([]);
let toAccounts = reactive([]);
const {
  data: dataHistories,
  statusCode: codeHistories,
  onFetchResponse: resHistories,
  onFetchError: errHistories,
  post: postHistory,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/histories',
  {immediate: false},
);

const {
  data: dataAccounts,
  onFetchResponse: resAccounts,
  get: getAccounts,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/accounts',
  {immediate: false},
);

const {
  data: dataUsers,
  get: getUsers,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users',
  {immediate: false},
);

const validationErrorMessages = ref({
});

// get all accounts
getAccounts().json().execute();
resAccounts(() => {
  accounts.value = dataAccounts.value;
  toAccounts = accounts.slice();
  fromAccounts = accounts.slice();
});

// get all users
getUsers().json().execute();
fromAccounts = computed(() => accounts.value.filter(
  account => account.id !== history.value.to_account_id,
));
toAccounts = computed(() => accounts.value.filter(
  account => account.id !== history.value.from_account_id,
));

resHistories(() => {
  navigateTo({name: 'dashboard'});
});
errHistories(() => {
  if (codeHistories.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = dataHistories.value;
  }
  return false;
});
const submit = () => {
  // Xóa hết error message
  validationErrorMessages.value = {};
  // Định nghĩa kiểu gửi là chuyển tiền
  history.value.history_type_id = getConfig('constants.historyTypes.tranfer');
  // Định dạng ngày, nếu ngày không được nhập thì lấy ngày hiện tại
  const currentDate = ref(null);
  if (history.value.created_history_at === '') {
    const temp = new Date();
    currentDate.value = temp.toString();
  } else {
    currentDate.value = history.value.created_history_at.toString();
  }
  const formatted_date = currentDate.value.slice(4, 15);
  history.value.created_history_at = formatted_date;

  postHistory(history.value).json().execute();
};

</script>

<style scoped>
form div {
  margin-top: 8px;
}
input,
select,
* >>> .dp__input {
  min-height: 45px;
}
</style>
