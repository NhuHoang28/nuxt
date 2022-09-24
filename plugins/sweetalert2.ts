// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swal', Swal);
});
