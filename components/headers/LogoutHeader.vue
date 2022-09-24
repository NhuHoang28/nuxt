<template>
  <BContainer>
    <BRow>
      <BCol class="position-fixed top-0 start-0 menu-top">
        <BRow class="d-flex justify-content-between mt-2">
          <BCol cols="3" class="mb-2 d-flex justify-content-center align-items-center">
            <a href="/dashboard"><img src="../../assets/home.jpg" alt=""></a>
          </BCol>
          <BCol cols="4" class=" text-center">
            <BRow>
              <BCol>
                <BIconBoxArrowLeft class="logout" @click="logout" />
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <p class="m-0">Đăng xuất</p>
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
import {BIconBoxArrowLeft} from 'bootstrap-icons-vue';

const {deleteToken} = useToken();
const {
  onFetchResponse,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/logout',
  {immediate: false},
);
onFetchResponse(() => {
  deleteToken();
  return navigateTo({name: 'login'});
});
const logout = () => {
  get().json().execute();
};
</script>

<style scoped>
p {
  color: rgb(252, 88, 88);
}
.logout {
  color: rgb(255, 80, 80);
  font-size: x-large;
}
</style>
