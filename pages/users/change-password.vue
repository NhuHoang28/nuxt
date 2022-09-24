<template>
  <BContainer>
    <BRow>
      <BCol>
        <h1 class="text-center mt-3 mb-4">Đổi mật khẩu</h1>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <form @submit.prevent="save">
          <div role="group" class="mb-3">
            <label> Nhập mật khẩu cũ </label>
            <BFormInput
              id="input-live"
              v-model="changeData.current_password"
              :state="validationErrorMessages.current_password === ơ ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              type="password"
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.current_password" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Nhập mật khẩu mới </label>
            <BFormInput
              id="input-live"
              v-model="changeData.password"
              :state="validationErrorMessages.password === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              type="password"
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.password" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Nhập lại mật khẩu với </label>
            <BFormInput
              id="input-live"
              v-model="changeData.confirm_password"
              :state="isPasswordMatched"
              aria-describedby="input-live-help input-live-feedback"
              required
              type="password"
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.confirm_password" />
            </BFormInvalidFeedback>
          </div>
          <SubmitButton
            :content="'Lưu'"
            :color="'#fc9999'"
            class="mt-2"
          />
        </form>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>

definePageMeta({
  middleware: 'authenticated',
  layout: 'page',
});
const {getConfig} = useConfig();
const {successAlert} = useAlert();
const changeData = ref({
  current_password: '',
  password: '',
  confirm_password: '',
});
const validationErrorMessages = ref({
});
const {
  data,
  onFetchResponse,
  statusCode,
  onFetchError,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/change-password',
  {immediate: false},
);
const isPasswordMatched = computed(
  () => (changeData.value.confirm_password === '' ? null : changeData.value.confirm_password === changeData.value.password),
);
onFetchResponse(() => {
  successAlert('Thay đổi mật khẩu thành công!', '/users/me');
});
onFetchError(() => {
  if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = data.value;
  }
  return false;
});
function save () {
  validationErrorMessages.value = {};
  if (isPasswordMatched.value) {
    put(changeData).json().execute();
  }
}
</script>

<style scoped>
form {
  color: rgb(252, 118, 118);
}
form input {
  min-height: 45px;
}
</style>
