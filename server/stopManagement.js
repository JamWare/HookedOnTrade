import {streakStore, prepStore, coinInventoryStore} from './callLeStore'
import { upsertToBase } from "../callUpsertToBase";

export const stopManagement = async (supabase) => {
    if (prepStore.getSize < 1 || prepStore.getStop) {
        prepStore.setRecapMsg("Stopped with : setSize = " + prepStore.getSize + " and stop = " + prepStore.getStop);
    
        streakStore.setStop(true);
        streakStore.setSize(1);
        // Selling all coins
        if(coinInventoryStore.getCoin(prepStore.getCurrency) >= 1){
          const sellResp = await short(prepStore.getCurrency, coinInventoryStore.getCoin(prepStore.getCurrency), prepStore.getLeverage);
          coinInventoryStore.setQuantity(prepStore.getCurrency, 0);
          if (sellResp.code !== "200000") {
            coinInventoryStore.setQuantity(coinInventoryStore.getCoin(prepStore.getCurrency) + 1);
            streakStore.setStop(true);
            prepStore.setRecapMsg("failed to call sell API & close trade");
          }
        }
        else if (coinInventoryStore.getCoin(prepStore.getCurrency) < 0){
          const shortResp = await long(prepStore.getCurrency, coinInventoryStore.getCoin(prepStore.getCurrency), prepStore.getLeverage);
          if (shortResp.code !== "200000") {
            streakStore.setStop(true);
            prepStore.setRecapMsg("failed to call sell API & close trade on sell");
            upsertToBase(supabase);
            return {
              response: "failed to call buy API & close trade",
            };
          }
          coinInventoryStore.setQuantity(prepStore.getCurrency, 0);
        }
        else {
          streakStore.setStop(true);
          prepStore.setRecapMsg("No coins to sell");
        }
    
        upsertToBase(supabase);
        return {
          response: "stopped with : setSize = " + prepStore.getSize + " and stop = " + prepStore.getStop,
          size: 1,
        };
      }
}