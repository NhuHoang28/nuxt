<template>
  <BContainer>
    <BRow class="mt-3 title">
      <BCol class="text-center">
        <h4>Chi tiết tài khoản chung</h4>
      </BCol>
    </BRow>
    <BRow class="full d-flex align-items-center">
      <form class="col p-3" @submit.prevent="update">
        <BRow>
          <div role="group" class="mb-2">
            <label> Tên tài khoản chung</label>
            <BFormInput
              id="input-live"
              v-model="updateData.name"
              :state="validationErrorMessages.name === undefined ? null : false"
              class="mt-2"
              aria-describedby="input-live-help input-live-feedback"
              required
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.name" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Giá trị</label>
            <BFormInput
              id="input-live"
              v-model="updateData.amount"
              disabled
              trim
            />
          </div>
        </BRow>
        <BRow class="mt-4">
          <SubmitButton
            :content="'Lưu'"
            :color="'#fc9999'"
            class="col ps-1"
          />
          <SubmitButton
            :content="'Xóa'"
            :color="'#fc9999'"
            class="col pe-1"
            @click.prevent="Del"
          />
        </BRow>
      </form>
    </BRow>
  </BContainer>
</template>
<script setup>
definePageMeta({
  middleware: 'authenticated',
  layout: 'back-page',
});
const {formatter} = useFormatMoney();
const {getConfig} = useConfig();
const route = useRoute();
const {successAlert, errorAlert} = useAlert();
const {$swal} = useNuxtApp();
const updateData = ref({
  name: '',
  amount: '',
});
const validationErrorMessages = ref({});
// Lấy thông tin tài khoản chung
const {
  data: dataGet,
  onFetchResponse: resGet,
  onFetchError: errGet,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  `/accounts/${route.params.id}`,
  {immediate: false},
);
// Sửa tài khoản chung
const {
  data: dataPut,
  statusCode: codePut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  `/accounts/${route.params.id}`,
  {immediate: false},
);
// Xóa tài khoản chung
const {
  data: dataDel,
  onFetchResponse: resDel,
  onFetchError: errDel,
  delete: del,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  `/accounts/${route.params.id}`,
  {immediate: false},
);
// Trả về khi lấy tài khoản
get().json().execute();
resGet(() => {
  updateData.value = dataGet.value;
  updateData.value.amount = formatter.format(updateData.value.amount);
});
errGet(() => {
  errorAlert(dataGet.value.message, '/accounts');
});
// Trả lại khi sửa tài khoản
resPut(() => {
  successAlert('Chỉnh sửa tài khoản chung thành công!', '/accounts');
});
errPut(() => {
  if (codePut.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = dataPut.value;
  } else {
    errorAlert(dataPut.value.message, '/accounts');
  }
});
const update = () => {
  validationErrorMessages.value = {};
  put({
    name: updateData.value.name,
  }).json().execute();
};
// Trả lại khi xóa tài khoản
resDel(() => {
  successAlert('Xóa tài khoản chung thành công!', '/accounts');
});
errDel(() => {
  console.log('loi del');
  errorAlert(dataDel.value.message, '/accounts');
});

const Del = () => {
  $swal.fire({
    title: 'Bạn muốn xóa tài khoản chung này?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    confirmButtonColor: 'rgb(252, 118, 118)',
  }).then((result) => {
    if (result.isConfirmed) {
      del().json().execute();
    }
  });
};
</script>
<style scoped>
form {
  color: rgb(252, 118, 118);
}
.full {
  height: calc(100vh - 140px);
}
</style>
