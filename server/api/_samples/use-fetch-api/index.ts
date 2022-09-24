export default defineEventHandler(async (event) => {
  let response: Record<string, unknown> = {
    requestHeaders: event.req.headers,
    requestBody: undefined,
    requestQuery: await useQuery(event.req),
    created_at: new Date().toISOString(),
  };

  if (isMethod(event.req, 'POST')) {
    response = {
      ...response,
      requestBody: await useBody(event.req),
    };
  }

  return response;
});
