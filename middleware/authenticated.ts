export default defineNuxtRouteMiddleware(() => {
  const {token} = useToken();
  if (token.value === undefined) {
    return navigateTo({name: 'login'});
  }
  return true;
});
