<template>
  <p>Hi! Here is the first page!</p>
  <main
    class="container mx-auto my-4 flex items-center justify-center min-h-screen"
  >
    <div class="place-content-center">

      <pre>{{ pendingTest ? "Test currently loading" : testData }}</pre>
      <div class="pb-7 justify-center">
        <UButton @click="buyHandler" size="xl">LONG</UButton>
      </div>
      <div class="py-7">
        <UButton @click="shortHandler" color="red" size="xl">SHORT</UButton>
      </div>
      <div class="pt-7">
        <UButton @click="sellHandler" size="xl" color="yellow">SELL</UButton>
      </div>
      <div class="pt-7">
        <UButton @click="infoHandler" size="xl" color="blue">INFO</UButton>
      </div>
      <div class="pt-7">
        <UButton @click="testHandler" size="xl" color="purple">Test</UButton>
      </div>
      <div class="pt-7">
        <UButton @click="persistHandler" size="xl" color="rose"
          >Persist</UButton
        >
      </div>
    </div>
    <div>
      <div class="pt-7">
        <UButton @click="executeTReception" size="xl" color="teal"
          >tradeReception</UButton
        >
      </div>
      <div class="pt-7">
        <UButton size="xl" color="orange"
          ><NuxtLink to="/showFile">Go And see the file</NuxtLink></UButton
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const {
  data: buyData,
  pending: pendingBuy,
  refresh: refreshBuy,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "long" },
  transform: (_data) => _data,
  immediate: false,
});

const {
  data: sellData,
  pending: pendingSell,
  refresh: refreshSell,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "sell" },
  transform: (_data) => _data,
  immediate: false,
});

const {
  data: infoData,
  pending: pendingInfo,
  refresh: refreshInfo,
} = await useFetch("/api/accInfo", {
  transform: (_infoData: any) => _infoData.account,
  immediate: false,
});

const {
  data: testData,
  pending: pendingTest,
  refresh: refreshTest,
} = await useFetch("/api/tests", {
  //transform: (_infoData: any ) => _infoData.account,
  immediate: false,
});

const {
  data: persistData,
  pending: pendingPersist,
  refresh: refreshPersist,
} = await useFetch("/api/dataPersistor", {
  // transform: (_persistData: any ) => _persistData.size,
  immediate: false,
});

const {
  data: tradeData,
  pending: pendingTrade,
  execute: executeTReception,
} = await useFetch("/api/tradeReception", {
  transform: (_persistData: any) => _persistData.response,
  immediate: false,
});

watch(pendingTrade, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    // trade is done
    //console.log(tradeData.value);
  }
  //console.log('Trade is pending');
});

const buyHandler = async () => {
  await refreshBuy();
  //console.log(buyData.value);
};
const shortHandler = () => {
  //console.log('shortHandler');
};
const sellHandler = async () => {
  await refreshSell();
  // console.log(sellData.value);
};
const infoHandler = async () => {
  await refreshInfo();
  // console.log(infoData.value);
};
const testHandler = async () => {
  await refreshTest();
  // console.log(testData.value);
};
const persistHandler = async () => {
  await refreshPersist();
  // console.log(persistData.value);
};
</script>
