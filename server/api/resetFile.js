import { useStreakStore, usePrepStore, useCoinInventoryStore } from "@/stores/leStore";
import { usePinia } from "../plugins/pinia";
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseUser(event)

  const pinia = usePinia();
  const streakStore = useStreakStore(pinia);
  const prepStore = usePrepStore(pinia);
  const coinInventoryStore = useCoinInventoryStore(pinia);

  const getFromBase = async () => {
    const { data: dataFromBase, error } = await supabase
    .from('StoreGrabber')
    .select()

    if (dataFromBase){
      streakStore.$patch(dataFromBase[0].streakStore)
      prepStore.$patch(dataFromBase[0].prepStore)
      coinInventoryStore.$patch(dataFromBase[0].coinInventoryStore)
    }
  }

  await getFromBase();

  const upsertToBase = async () => {    
      const { data : dataToBase, error } = await supabase
      .from('StoreGrabber')
      .upsert({ id: 1,
        streakStore: streakStore.$state, 
        prepStore: prepStore.$state, 
        coinInventoryStore: coinInventoryStore.$state})
      .select()
    }
  
  if (body && typeof body.resetInventory === 'undefined') {
    prepStore.setMaxDrawdown(body.maxDrawdown);
    prepStore.setStatus(body.status);

    streakStore.setSize(body.size);
    streakStore.setLeverage(body.leverage);
    streakStore.setWon(body.won);
    streakStore.setLoss(body.loss);
    streakStore.setPreventFirstTrade(body.preventFirstTrade)
    streakStore.setStop(body.stop);

    await upsertToBase();
  }
  else if (body && body.resetInventory) {
    if (body.resetInventory === true) {
       coinInventoryStore.resetInventory();
       await upsertToBase();
      return {
        inventoryState: coinInventoryStore.$state,
      };
    }
  }

  return {
    datastate: streakStore.$state,
    prepstate: prepStore.$state,
    inventoryState: coinInventoryStore.$state,
  };
});
