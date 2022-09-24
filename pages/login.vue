<template>
  <div class="full">
    <BContainer fluid class="container-fluid">
      <BContainer>
        <BRow lg="7" class="text-center">
          <BCol>
            <h1 class="align-self-left">Đăng nhập</h1>
          </BCol>
        </BRow>
        <BRow class="d-flex justify-content-center">
          <BCol lg="7">
            <form @submit.prevent="submit">
              <div role="group">
                <BFormInput
                  id="input-live"
                  v-model="requestBody.username"
                  :state="validationErrorMessages.username === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Tên đăng nhập"
                  trim
                  required
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.username" />
                </BFormInvalidFeedback>
              </div>
              <div role="group">
                <BFormInput
                  id="input-live"
                  v-model="requestBody.password"
                  :state="validationErrorMessages.password === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Mật khẩu"
                  trim
                  type="password"
                  required
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.password" />
                </BFormInvalidFeedback>
              </div>
              <div v-if="unauthorizedErrorMessage !== ''" class="text-center mess">
                {{ unauthorizedErrorMessage }}
              </div>
              <SubmitButton
                :content="'Đăng nhập'"
                :color="'black'"
              />
            </form>
          </BCol>
        </BRow>
        <BRow class="mt-2 mb-5">
          <BCol class="text-center">
            <span>Bạn chưa có tài khoản? </span>
            <a href="/register">Đăng ký</a>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
  </div>
</template>

<script setup>

definePageMeta({
  layout: false,
});
const {setToken} = useToken();
const {getConfig} = useConfig();
const requestBody = reactive({username: '', password: ''});
const unauthorizedErrorMessage = ref('');
const validationErrorMessages = ref({
});
const {
  data,
  statusCode,
  onFetchResponse,
  onFetchError,
  post,
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: true,
})(
  '/users/login',
  {immediate: false},
);
onFetchResponse(() => {
  setToken(data.value.token);
  return navigateTo({name: 'dashboard'});
});
onFetchError(() => {
  if (statusCode.value === getConfig('constants.statusCodes.unauthorized')) {
    unauthorizedErrorMessage.value = data.value.message;
  } else if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = data.value;
  }
  return false;
});
// submit login
const submit = () => {
  unauthorizedErrorMessage.value = '';
  validationErrorMessages.value = {};
  post(requestBody).json().execute();
};
</script>
<style scoped>
.full{
  height: 100vh;
  background-color: #fc9b9b;
}
.full>div {
  position: absolute;
  bottom: 0;
}
a {
  color: white;
}
.mess{
  color:red;
}
</style>
