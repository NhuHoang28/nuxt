const useFormatMoney = () => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });
  return {formatter};
};
export default useFormatMoney;
