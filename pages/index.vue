<template>
  <p>Hi! Kinda getting better over there!</p>
  <div class="container grid items-center justify-center py-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

    
    <div class="px-4 py-4">
      <pre>{{ pendingInfo ? null : "The info you requested is: " + JSON.stringify(infoData) }}</pre>
      
      <pre>{{ pendingBuy ? null : "The buy response is: " + JSON.stringify(buyData) }}</pre>
      
      <pre>{{ pendingShort ? null : "The short response is: " + JSON.stringify(shortData) }}</pre>
 
      <pre>{{ pendingSell ? null : "The sell response is: " + JSON.stringify(sellData) }}</pre>

      <pre>{{ pendingResetInventory ? null : "The inventory was reseted: " + JSON.stringify(resetInventoryData) }}</pre>
    </div>
  </div>
  <main
    class="container mx-auto my-4 flex items-center justify-center"
  >
    <div class="place-content-center">

      <div class="pb-5">
        <UInputMenu
          v-model="selectedCoin"
          :options="contractsnCoins"
          placeholder="Select a coin"/>
      </div>

      <div class="pb-7 justify-center">
        <UButton @click="buyHandler" size="xl">LONG</UButton>
      </div>

      <div class="py-7">
        <UButton @click="shortHandler" color="red" size="xl">SHORT</UButton>
      </div>
      <div class="py-7">
        <UButton @click="sellHandler" size="xl" color="yellow">SELL</UButton>
      </div>
      <div class="py-7">
        <UButton @click="infoHandler" size="xl" color="blue">INFO</UButton>
      </div>
      <div class="py-7">
        <UButton @click="resetInventoryHandler" size="xl" color="orange">Reset Inventory</UButton>
      </div>
    </div>
    <div>
      <div class="pt-7">
        <UButton size="xl" color="orange"
          ><NuxtLink to="/showFile">Go And see the file</NuxtLink></UButton
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

const selectedCoin = ref<string>('PEOPLEUSDTM');
let coinToBuy = ref<string>('');
let coinToShort = ref<string>('');
let coinToInfo = ref<string>('');
let coinToSell = ref<string>('');
const contractsnCoins = ['SHIBUSDTM', 'USDT', 'XBTUSDTM', 'ETHUSDTM', 'SOLUSDTM', 'OPUSDTM', '10000LADYSUSDTM' ,'PEOPLEUSDTM', 'PEPEUSDTM', 'DOGEUSDTM', 'AVAXUSDTM', 'XRPUSDTM', 'LINKUSDTM', 'RUNEUSDTM', 'BBUSDTM'];

const {
  data: buyData,
  pending: pendingBuy,
  refresh: refreshBuy,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "long", currency: coinToBuy },
  //transform: (_data) => _data,
  immediate: false,
  watch: false
});

const {
  data: shortData,
  pending: pendingShort,
  refresh: refreshShort,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "short", currency: coinToShort },
  transform: (_data) => _data,
  immediate: false,
  watch: false
});

const {
  data: sellData,
  pending: pendingSell,
  refresh: refreshSell,
} = await useFetch("/api/tradeReception", {
  method: "POST",
  body: { tradeType: "sell", currency: coinToSell },
  transform: (_data) => _data,
  immediate: false,
  watch: false
});

const {
  data: infoData,
  pending: pendingInfo,
  refresh: refreshInfo,
} = await useFetch("/api/accInfo", {
  method: "POST",
  body: { currency: coinToInfo },
  transform: (_infoData: any) => _infoData.account,
  immediate: false,
  watch: false
});

const {
  data: resetInventoryData,
  pending: pendingResetInventory,
  refresh: refreshResetInventory,
} = await useFetch("/api/resetFile", {
  method: "POST",
  body: { resetInventory: true },
  transform: (_infoData: any) => _infoData.inventoryState,
  immediate: false,
  watch: false
});

const buyHandler = async () => {
  coinToBuy.value = selectedCoin.value;
    await refreshBuy();
};
const shortHandler = async () => {
  coinToShort.value = selectedCoin.value;
    await refreshShort();
};
const sellHandler = async () => {
  coinToSell.value = selectedCoin.value;
  await refreshSell();
};
const infoHandler = async () => {
  coinToInfo.value = selectedCoin.value;
};
const resetInventoryHandler = async () => {
  await refreshResetInventory();
};

watch(pendingInfo, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingBuy.value = true;
    pendingShort.value = true;
    pendingSell.value = true;
    pendingResetInventory.value = true;
  }
});
watch(pendingBuy, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingInfo.value = true;
    pendingShort.value = true;
    pendingSell.value = true;
    pendingResetInventory.value = true;
  }
});
watch(pendingShort, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingInfo.value = true;
    pendingBuy.value = true;
    pendingSell.value = true;
    pendingResetInventory.value = true;
  }
});
watch(pendingSell, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingInfo.value = true;
    pendingShort.value = true;
    pendingBuy.value = true;
    pendingResetInventory.value = true;
  }
});
watch(pendingResetInventory, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    pendingInfo.value = true;
    pendingShort.value = true;
    pendingBuy.value = true;
    pendingSell.value = true;
  }
});

</script>
