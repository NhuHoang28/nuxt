<script lang="ts" setup>
definePageMeta({
  layout: false,
});

// Demo 1: Execute automatically on initial display
const requireAuth = ref(true);
const reload = ref();
const res1 = ref();
watch(requireAuth, (newVal) => {
  const {data, isFinished, execute: refresh} = useFetchApi({requireAuth: newVal})('/_samples/use-fetch-api');
  reload.value = () => refresh();

  watch(isFinished, () => {
    res1.value = data.value;
  });
}, {immediate: true});

const toggleRequireAuth = () => {
  requireAuth.value = !requireAuth.value;
};

// Demo 2: Execute manually by clicking button
const requestBody = reactive({name: 'Peter', requireAuth});
const requestQuery = reactive({userId: '1'});
const {url: url2} = useUrl({
  path: '/_samples/use-fetch-api',
  queryParams: requestQuery,
});

const {
  data: res2,
  isFetching: isFetching2,
  isFinished: isFinished2,
  onFetchResponse,
  onFetchError,
  onFetchFinally,
  post,
} = useFetchApi()(url2, {immediate: false});

// Fires after the fetch request has finished
onFetchResponse((response) => {
  console.log(response);
  console.log(res2);
});

// Fires after a fetch request error
onFetchError((error) => {
  console.log(error);
});

// Fires after a fetch has completed
onFetchFinally(() => {
  console.log('finally');
});

const postData = () => {
  post(requestBody).execute();
};
const updateRequestQuery = (event: Event) => {
  const {value} = event.target as HTMLInputElement;
  Object.assign(requestQuery, {userId: value});
};
</script>

<template>
  <div>
    <div>
      <h1>immediate: true</h1>
      <div><pre>{{ res1 }}</pre></div>
      <div><button @click="reload">Reload (RequireAuth = {{ requireAuth }})</button></div>
      <div><button @click="toggleRequireAuth">Toggle Require Auth</button></div>
    </div>
    <hr>
    <div>
      <h1>immediate: false</h1>
      <div v-if="isFinished2"><pre>{{ res2 }}</pre></div>
      <div v-else-if="isFetching2">Loading</div>
      <div v-else>Please click below button to load data</div>
      <div>
        <label>requestBody (name):</label>
        <input v-model="requestBody.name">
      </div>
      <div>
        <label>requestQuery (userId):</label>
        <input
          :value="requestQuery.userId"
          @input="(event: any) => updateRequestQuery(event)"
        >
      </div>
      <div><button @click="postData">Reload (RequireAuth = true)</button></div>
    </div>
  </div>
</template>
