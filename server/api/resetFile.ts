import { useStreakStore, usePrepStore, useCoinInventoryStore } from "@/stores/leStore";
import { usePinia } from "../plugins/pinia";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const pinia = usePinia();
  const streakStore = useStreakStore(pinia);
  const prepStore = usePrepStore(pinia);
  const inventoryStore = useCoinInventoryStore(pinia);
  
  if (body && typeof body.resetInventory === 'undefined') {
    prepStore.setMaxDrawdown(body.maxDrawdown);
    prepStore.setStatus(body.status);

    streakStore.setSize(body.size);
    streakStore.setLeverage(body.leverage);
    streakStore.setWon(body.won);
    streakStore.setLoss(body.loss);
    streakStore.setPreventFirstTrade(body.preventFirstTrade)
    streakStore.setStop(body.stop);
  }
  else if (body && body.resetInventory) {
    if (body.resetInventory === true) {
      inventoryStore.resetInventory();
      return {
        inventoryState: inventoryStore.$state,
      };
    }
  }
  return {
    datastate: streakStore.$state,
    prepstate: prepStore.$state,
    inventoryState: inventoryStore.$state,
  };
});
