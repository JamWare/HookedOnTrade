<template>
  <p>Hi! Kinda getting better over there!</p>
  <main
    class="container mx-auto my-4 flex items-center justify-center min-h-screen"
  >
    <div class="place-content-center">
      
      <!-- <pre>{{ pendingInfo ? null : "The info you requested is: " + infoData }}</pre> -->
    
      <pre>{{ pendingTest ? null : testData }}</pre>

      
      <pre>{{ pendingBuy ? null : "The buy response is: " + JSON.stringify(buyData) }}</pre>

      <pre>{{ pendingShort ? null : "The short response is: " + JSON.stringify(shortData) }}</pre>

      <pre>{{ pendingSell ? null : "The sell response is: " + JSON.stringify(sellData) }}</pre>

      <div>
        <UInputMenu
          v-model="selectedCoin"
          :options="contractsnCoins"
          placeholder="Select a coin"/>
      </div>

      <div class="pb-7 justify-center">
        <UButton @click="buyHandler" size="xl">LONG</UButton>
      </div>
      <div>

      </div>
      <div class="py-7">
        <UButton @click="shortHandler" color="red" size="xl">SHORT</UButton>
      </div>
      <div>

      </div>
      <div class="pt-7">
        <UButton @click="sellHandler" size="xl" color="yellow">SELL</UButton>
      </div>
      <div>

      </div>
      <div class="pt-7">
        <UButton @click="infoHandler" size="xl" color="blue">INFO</UButton>
      </div>
      <div class="pt-7">
        <UButton @click="testHandler" size="xl" color="purple">Test</UButton>
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

const selectedCoin = ref<string>('SHIBUSDTM');
let coinToBuy = ref<string>('');
let coinToShort = ref<string>('');
let coinToInfo = ref<string>('');
let coinToSell = ref<string>('');
const contractsnCoins = ['SHIBUSDTM', 'USDT', 'XBTUSDTM', 'ETHUSDTM', 'SOLUSDTM', 'PEPEUSDTM', 'DOGEUSDTM', 'AVAXUSDTM', 'XRPUSDTM', 'LINKUSDTM', 'RUNEUSDTM', 'BBUSDTM'];

const {
  data: buyData,
  pending: pendingBuy,
  refresh: refreshBuy,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "long", currency: toRaw(coinToBuy) },
  transform: (_data) => _data,
  immediate: false,
});

const {
  data: shortData,
  pending: pendingShort,
  refresh: refreshShort,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "short", currency: toRaw(coinToShort) },
  transform: (_data) => _data,
  immediate: false,
});

const {
  data: sellData,
  pending: pendingSell,
  refresh: refreshSell,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "sell", currency: toRaw(coinToSell) },
  transform: (_data) => _data,
  immediate: false,
});

const {
  data: infoData,
  pending: pendingInfo,
  refresh: refreshInfo,
} = await useFetch("/api/accInfo", {
  method: "POST",
  body: { currency: toRaw(coinToInfo) },
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
  coinToBuy.value = selectedCoin.value;
  //console.log(coinToBuy.value);
  await refreshBuy();
  //console.log(buyData.value);
};
const shortHandler = async () => {
  coinToShort.value = selectedCoin.value;
  await refreshShort();
  //console.log('shortData.value');
};
const sellHandler = async () => {
  coinToSell.value = selectedCoin.value;
  await refreshSell();
  // console.log(sellData.value);
};
const infoHandler = async () => {
  //coinToInfo.value = selectedCoin.value;
  //await refreshInfo();
  // console.log(infoData.value);
};
const testHandler = async () => {
  //coinToTest = { ...selectedCoin };
  await refreshTest();
  // console.log(testData.value);
};
</script>
