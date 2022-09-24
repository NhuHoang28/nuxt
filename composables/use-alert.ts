const useAlert = () => {
  const {$swal} = useNuxtApp();
  const errorAlert = (mess: string, res: string) => {
    $swal.fire({
      title: 'Lỗi',
      text: mess,
      icon: 'error',
      confirmButtonText: 'Đóng',
      confirmButtonColor: 'red',
    }).then(() => {
      navigateTo(res);
    });
  };
  const successAlert = (mess: string, res: string) => {
    $swal.fire({
      title: 'Success!',
      text: mess,
      icon: 'success',
      confirmButtonText: 'Đóng',
      confirmButtonColor: 'rgb(252, 118, 118)',
    }).then(() => {
      navigateTo(res);
    });
  };
  return {errorAlert, successAlert};
};
export default useAlert;
