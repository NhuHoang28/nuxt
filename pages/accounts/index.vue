<template>
  <BContainer>
    <BRow>
      <BCol class="mt-4 d-flex justify-content-between">
        <h5 class="d-inline"> Tài khoản của cả gia đình</h5>
        <BIconPlusCircle class="plus" @click="navigateTo('accounts/add')" />
      </BCol>
    </BRow>
    <BRow class="mt-3 list">
      <BCol class="">
        <BRow>
          <BCol>
            <div
              v-for="account in dataGetAccounts" :key="account.id"
              class="d-flex justify-content-between account mb-3 "
              :style="[account.user_id !== ''
                ? account.user_id === dataGetMe.id
                  ? 'backgroundColor: rgb(252, 207, 207)'
                  : '' : 'backgroundColor: rgb(253, 234, 234)']"
              @click="[account.user_id !== ''
                ? account.user_id === dataGetMe.id
                  ? navigateTo('/users/me')
                  : false
                : navigateTo(`/accounts/${account.id}`)]"
            >
              <p class="col-auto">{{ account.name }}</p>
              <p class="col-auto">{{ account.amount }}</p>
            </div>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <div class="d-flex justify-content-between sum-account mb-3">
              <p class="col-auto">Tổng</p>
              <p class="col-auto">{{ sumAccount }}</p>
            </div>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>
import {BIconPlusCircle} from 'bootstrap-icons-vue';

definePageMeta({
  middleware: 'authenticated',
  layout: 'page',
});
const {formatter} = useFormatMoney();
// Lấy tất cả account
const {
  data: dataGetAccounts,
  onFetchResponse: resGetAccounts,
  get: getAccounts,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/accounts',
  {immediate: false},
);
// Lấy thông tin cá nhân
const {
  data: dataGetMe,
  get: getMe,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/me',
  {immediate: false},
);

const sumAccount = ref(0);
getMe().json().execute();

getAccounts().json().execute();
resGetAccounts(() => {
  for (let i = 0; i < dataGetAccounts.value.length; i += 1) {
    sumAccount.value += dataGetAccounts.value[i].amount;
    dataGetAccounts.value[i].amount = formatter.format(dataGetAccounts.value[i].amount);
  }
  sumAccount.value = formatter.format(sumAccount.value);
});
</script>
<style scoped>
h5 {
  color: rgb(252, 88, 88);
}

p {
  margin: 8px !important;
}
.account,
.sum-account {
  background-color: #ececec;
  border-radius: 10px;
  box-shadow: 8px 8px 8px -8px gray;
}

.sum-account {
  background-color: rgb(248, 155, 155);
}
.plus {
  color: rgb(255, 80, 80);
  font-size: x-large;
}
.list {
  overflow: auto !important;
  height: calc(100vh - 150px) !important;
}
</style>
