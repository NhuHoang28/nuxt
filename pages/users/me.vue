<template>
  <BContainer>
    <BRow>
      <BCol>
        <h1 class="text-center mt-3 mb-4">Trang cá nhân của tôi</h1>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <form @submit.prevent="save">
          <div role="group" class="mb-3">
            <label> Tên đăng nhập </label>
            <BFormInput
              id="input-live"
              v-model="user.username"
              :state="validationErrorMessages.username === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              disabled
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.username" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Họ và tên </label>
            <BFormInput
              id="input-live"
              v-model="user.fullname"
              :state="validationErrorMessages.fullname === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.fullname" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Mã nhóm </label>
            <BFormInput
              id="input-live"
              v-model="user.group_id"
              :state="validationErrorMessages.group_id === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              disabled
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.group_id" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Email </label>
            <BFormInput
              id="input-live"
              v-model="user.email"
              :state="validationErrorMessages.email === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback"
              required
              type="email"
              trim
            />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.email" />
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

    <BRow class="mt-3">
      <BCol class="pe-1">
        <SubmitButton
          :content="'Đổi mật khẩu'"
          :color="'rgb(252, 111, 111)'"
          @click="navigateTo('change-password')"
        />
      </BCol>
      <BCol class="ps-1">
        <SubmitButton
          :content="'Tài khoản gia đình'"
          :color="'rgb(252, 111, 111)'"
          @click="navigateTo('/accounts')"
        />
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>
definePageMeta({
  middleware: 'authenticated',
  layout: 'logout-page',
});
const {getConfig} = useConfig();
const user = ref({
  username: '',
  fullname: '',
  email: '',
  group_id: '',
});
const validationErrorMessages = ref({
});

const {
  data: dataGet,
  onFetchResponse: resGet,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/me',
  {immediate: false},
);
const {
  data: dataPut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  statusCode: codePut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/me',
  {immediate: false},
);

// Lấy thông tin cá nhân
get().json().execute();
resGet(() => {
  user.value = dataGet.value;
  console.log(user.value);
});
// Trả về khi put thông tin cá nhân
resPut(() => {
  user.value = dataPut.value;
});
errPut(() => {
  if (codePut.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = dataPut.value;
  }
  return false;
});

function save () {
  // Xóa hết error message
  validationErrorMessages.value = {};
  put({
    fullname: user.value.fullname,
    email: user.value.email,
  }).json().execute();
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
