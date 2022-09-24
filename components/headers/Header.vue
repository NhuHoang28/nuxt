<template>
  <BContainer>
    <BRow>
      <BCol class="position-fixed top-0 start-0 menu-top">
        <BRow class="d-flex justify-content-between mt-2">
          <BCol cols="3" class="mb-2 d-flex justify-content-center align-items-center">
            <a href="/dashboard"><img src="../../assets/home.jpg" alt=""></a>
          </BCol>
          <BCol cols="4" class="mb-2 text-center">
            <BRow>
              <BCol>
                <a href="/users/me"><img src="../../assets/user.jfif" alt=""></a>
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <div class="total-money">{{ sumAccountsMoney }}</div>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
    <BRow class="back-header" />
  </BContainer>
</template>

<script setup>
const {formatter} = useFormatMoney();
const {
  data,
  onFetchResponse,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/accounts',
  {immediate: false},
);

const sumAccountsMoney = ref(0);

get().json().execute();
onFetchResponse(() => {
  for (let i = 0; i < data.value.length; i += 1) {
    sumAccountsMoney.value += data.value[i].amount;
  }
  sumAccountsMoney.value = formatter.format(sumAccountsMoney.value);
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: sans-serif Verdana;
}
</style>
