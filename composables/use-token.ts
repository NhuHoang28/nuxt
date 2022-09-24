const STORE_KEY_API_TOKEN = 'api-token';

const useToken = () => {
  const cookieTokenAPI = useCookie(STORE_KEY_API_TOKEN);
  const token = ref(cookieTokenAPI.value);

  const setToken = (t: string) => {
    cookieTokenAPI.value = t;
    token.value = cookieTokenAPI.value;
  };

  const deleteToken = () => {
    cookieTokenAPI.value = undefined;
    token.value = cookieTokenAPI.value;
  };

  return {setToken, deleteToken, token};
};

export default useToken;
