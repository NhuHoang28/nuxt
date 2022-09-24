<template>
  <BContainer>
    <BCol class="mt-2 text-center">
      <h4>Chi tiết tài khoản chung</h4>
    </BCol>
    <BRow class="d-flex align-items-center full">
      <form class="col p-3" @submit.prevent="create">
        <BRow>
          <div role="group" class="mb-2">
            <label> Tên tài khoản chung</label>
            <BFormInput
              id="input-live"
              v-model="createData"
              class="mt-2"
              :state="validationErrorMessages.name === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.name" />
            </BFormInvalidFeedback>
          </div>
        </BRow>
        <BRow class="mt-4">
          <SubmitButton
            :content="'Lưu'"
            :color="'#fc9999'"
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
const {getConfig} = useConfig();
const {successAlert} = useAlert();
const createData = ref('');
const validationErrorMessages = ref({});
const {
  data: dataPost,
  statusCode: codePost,
  onFetchResponse: resPost,
  onFetchError: errPost,
  post,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/accounts',
  {immediate: false},
);

// Trả lại khi tạo tài khoản
resPost(() => {
  successAlert('Tạo tài khoản thành công', '/accounts');
});
errPost(() => {
  if (codePost.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = dataPost.value;
  }
  return false;
});

const create = () => {
  validationErrorMessages.value = {};
  post({
    name: createData.value,
  }).json().execute();
};
</script>
<style scoped>
form {
  color: rgb(252, 118, 118);
}
.full {
  height: calc(100vh - 160px);
}
</style>
