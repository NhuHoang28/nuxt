<template>
  <div class="full">
    <BContainer fluid class="container-fluid">
      <BContainer>
        <BRow lg="7" class="text-center">
          <BCol>
            <h1 class="align-self-left mb-3">Đăng ký</h1>
          </BCol>
        </BRow>
        <BRow class="d-flex justify-content-center">
          <BCol lg="7">
            <form @submit.prevent="submit">
              <div role="group">
                <BFormInput
                  v-model="registerData.fullname"
                  :state="validationErrorMessages.fullname === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Họ và tên"
                  trim
                  required
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.fullname" />
                </BFormInvalidFeedback>
              </div>
              <div role="group">
                <BFormInput
                  v-model="registerData.username"
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
              <BFormInput
                v-model="registerData.password"
                type="password"
                placeholder="Mật khẩu"
                required
                class="mt-2"
              />
              <div role="group">
                <BFormInput
                  v-model="registerData.confirm_password"
                  :state="isPasswordMatched"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  trim
                  required
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.passwordConfirm" />
                </BFormInvalidFeedback>
              </div>
              <div role="group">
                <BFormInput
                  v-model="registerData.email"
                  :state="validationErrorMessages.email === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Địa chỉ email"
                  type="email"
                  trim
                  required
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.email" />
                </BFormInvalidFeedback>
              </div>
              <span class="mt-2 d-block">Bạn đã có nhóm?</span>
              <BRow class="d-flex justify-content-around">
                <BCol cols="auto" class="d-inline-block">
                  <input
                    id="no" v-model="registerData.have_group"
                    class="d-inline-block m-2"
                    type="radio"
                    value="0"
                  >
                  <label class="" for="no">Chưa có</label>
                </BCol>
                <BCol cols="auto" class="d-inline-block ml-3">
                  <input
                    id="yes" v-model="registerData.have_group"
                    class="d-inline-block m-2"
                    type="radio"
                    value="1"
                  >
                  <label class="" for="yes">Đã có</label>
                </BCol>
              </BRow>
              <div role="group">
                <BFormInput
                  v-if="parseInt(registerData.have_group)"
                  v-model="registerData.group_id"
                  :state="validationErrorMessages.group_id === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Mã nhóm"
                  type="password"
                  trim
                  :required="registerData.have_group"
                  class="mt-2"
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.group_id" />
                </BFormInvalidFeedback>
              </div>
              <SubmitButton
                :content="'Đăng ký'"
                :color="'black'"
              />
            </form>
          </BCol>
        </BRow>
        <BRow class="mt-2 mb-5">
          <BCol class="text-center">
            <span>Bạn đã có tài khoản? </span>
            <a href="/login">Đăng nhập</a>
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
const registerData = reactive({
  username: '',
  fullname: '',
  password: '',
  confirm_password: '',
  email: '',
  have_group: '0',
  group_id: '',
});
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
  '/users',
  {immediate: false},
);

const isPasswordMatched = computed(
  () => (registerData.confirm_password === '' ? null : registerData.confirm_password === registerData.password),
);

onFetchResponse(() => {
  setToken(data.value.api_token);
  navigateTo({name: 'dashboard'});
});
onFetchError(() => {
  if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = data.value;
    // Incase server return passwordConfirm no matched error message
    isPasswordMatched.value = validationErrorMessages.passwordConfirm !== '' ? null : false;
  }
  return false;
});
const submit = () => {
  validationErrorMessages.value = {};
  if (isPasswordMatched.value) {
    post(registerData).json().execute();
  }
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
</style>
