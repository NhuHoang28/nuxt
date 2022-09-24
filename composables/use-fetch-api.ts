import {createFetch} from '@vueuse/core';

type Options = {
  requireAuth?: boolean;
  disableHandleErrorUnauthorized?: boolean;
};

const handleErrorUnauthorized = (ctx, router) => {
  if (ctx.response.status === 401) {
    router.push({name: 'login'});
  }
};

/**
 * Handle the api fetching.
 * This composition also handles the api token intercepting and other common process.
 *
 * @docs https://vueuse.org/core/usefetch/
 * @returns useFetch instance
 */
const useFetchApi = (options: Options = {}) => {
  const {
    requireAuth = true,
    disableHandleErrorUnauthorized = false,
  } = options;

  const {token} = useToken();
  const router = useRouter();
  const config = useRuntimeConfig();

  return createFetch({
    baseUrl: config.public.apiBase,
    options: {
      beforeFetch ({options: opts}) {
        if (requireAuth && token.value) {
          // eslint-disable-next-line no-param-reassign
          opts.headers = {
            ...opts.headers,
            Authorization: `Bearer ${token.value}`,
          };
        }

        return {options: opts};
      },
      onFetchError ({data, response}) {
        if (!disableHandleErrorUnauthorized) {
          handleErrorUnauthorized({data, response}, router);
        }
        return {data, response};
      },
    },
  });
};

export default useFetchApi;
