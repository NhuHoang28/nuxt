<template>
  <BContainer>
    <BRow>
      <BCol>
        <BRow>
          <h5 class="col">
            Lịch sử biến động trong vòng 10 ngày
          </h5>
        </BRow>
        <BRow>
          <BCol>
            Bieu do
          </BCol>
        </BRow>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <BRow class="mb-3">
          <h5 class="col">
            Tài khoản của cả gia đình
          </h5>
        </BRow>
        <BRow class="d-flex justify-content-center">
          <BCol cols="11" sm="12">
            <BRow
              v-for="account in dataAccounts" :key="account.id"
              class="d-flex justify-content-between account mb-3 "
            >
              <p class="col-auto">{{ account.name }}</p>
              <p class="col-auto">{{ account.amount }}</p>
            </BRow>
            <BRow class="row d-flex justify-content-between sum-account mb-3">
              <p class="col-auto">Tổng</p>
              <p class="col-auto">{{ sumAccount }}</p>
            </BRow>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>

definePageMeta({
  middleware: 'authenticated',
});

const {formatter} = useFormatMoney();
const {
  data: dataAccounts,
  onFetchResponse,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/accounts',
  {immediate: false},
);
const sumAccount = ref(0);
get().json().execute();
onFetchResponse(() => {
  for (let i = 0; i < dataAccounts.value.length; i += 1) {
    sumAccount.value += dataAccounts.value[i].amount;
    dataAccounts.value[i].amount = formatter.format(dataAccounts.value[i].amount);
  }
  sumAccount.value = formatter.format(sumAccount.value);
});
</script>

<style scoped>
h5 {
  color: rgba(255, 123, 123);
}

p {
  margin: 8px;
}

.account,
.sum-account {
  background-color: #E8E8E8;
  border-radius: 10px;
  box-shadow: 8px 8px 8px -8px gray;
}

.sum-account {
  background-color: rgb(248, 192, 192);
}
</style>
