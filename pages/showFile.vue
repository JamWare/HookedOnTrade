<template>
  <form @submit.prevent="submitForm">
    <div
      class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-center py-8"
    >
      <div class="px-4 py-3">
        <label>maxDrawdown</label>
        <UInput disabled type="number" v-model="inputs.maxDrawdown" />
      </div>
      <div class="px-4 py-3">
        <label>prepUSDT</label>
        <UInput disabled v-model="inputs.USDT" />
      </div>
      <div class="px-4 py-3">
        <label>status</label>
        <UInput v-model="inputs.status" />
      </div>
      <div class="px-4 py-3">
        <label>size</label>
        <UInput disabled type="number" v-model="inputs.size" />
      </div>
      <div class="px-4 py-3">
        <label>leverage</label>
        <UInput disabled type="number" v-model="inputs.leverage" />
      </div>
      <div class="px-4 py-3">
        <label>won</label>
        <UInput type="number" v-model="inputs.won" />
      </div>
      <div class="px-4 py-3">
        <label>learned</label>
        <UInput type="number" v-model="inputs.loss" />
      </div>
      <div class="px-4 py-3">
        <label>preventFirstTrade</label>
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          v-model="inputs.preventFirstTrade"
          value="true"
        />
      </div>
      <div class="px-4 py-3">
        <label>inTrade</label>
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          v-model="inputs.inTrade"
          value="false"
        />
      </div>
      <div class="px-4 py-3">
        <label>stop</label>
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          v-model="inputs.stop"
          value="false"
        />
      </div>
    </div>
    <div>
      <UButton type="submit" size="xl" color="teal">writeDataToFile</UButton>
    </div>
  </form>
  <div class="grid-cols-2">
    <div>
      <UButton @click="execGetData" size="xl" color="blue"
        >justGetFilesData</UButton
      >
    </div>
    <div>
      <UButton size="xl" color="orange"
        ><NuxtLink to="/">Back to base</NuxtLink></UButton
      >
    </div>

    <div class="py-8">
      <pre>{{ pendingData ? "Data to be written" : returnData }}</pre>
      <pre>{{ pendingGetData ? null : getData }}</pre>
    </div>
  </div>
</template>
<script setup>
const inputs = ref({
  USDT: 156,
  maxDrawdown: 5,
  status: "neutral",
  size: 1,
  leverage: 1,
  won: 0,
  loss: 0,
  preventFirstTrade: false,
  inTrade: false,
  stop: false,
});

let dataForFile = ref({
  USDT: 0,
  maxDrawdown: 0,
  status: "idle",
  size: 0,
  leverage: 0,
  won: 0,
  loss: 0,
  preventFirstTrade: false,
  inTrade: false,
  stop: false,
});

const submitForm = () => {
  dataForFile.value = { ...inputs.value };
};
const {
  data: returnData,
  pending: pendingData,
  execute: sendData,
} = await useFetch("/api/resetFile", {
  method: "POST",
  body: toRaw(dataForFile),
  immediate: false,
});

const {
  data: getData,
  pending: pendingGetData,
  execute: execGetData,
} = await useFetch("/api/resetFile", {
  method: "POST",
  immediate: false,
});

watch(pendingGetData, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingData.value = true;
  }
});

watch(pendingData, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingGetData.value = true;
  }
});
</script>
