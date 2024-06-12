import {streakStore, prepStore, coinInventoryStore} from './callLeStore'
import { upsertToBase } from "../callUpsertToBase";

export const stopManagement = async (supabase, currency, size, stop) => {
    if (size < 1 || stop) {
        prepStore.setRecapMsg("Stopped with : setSize = " + prepStore.getSize + " and stop = " + prepStore.getStop);
    
        streakStore.setStop(true);
        streakStore.setSize(1);
        // Selling all coins
        if(coinInventoryStore.getCoin(currency) >= 1){
          const sellResp = await short(currency, coinInventoryStore.getCoin(currency), leverage);
          coinInventoryStore.setQuantity(currency, 0);
          if (sellResp.code !== "200000") {
            coinInventoryStore.setQuantity(coinInventoryStore.getCoin(currency) + 1);
            streakStore.setStop(true);
            prepStore.setRecapMsg("failed to call sell API & close trade");
          }
        }
        else if (coinInventoryStore.getCoin(currency) < 0){
          const shortResp = await long(currency, coinInventoryStore.getCoin(currency), leverage);
          if (shortResp.code !== "200000") {
            streakStore.setStop(true);
            prepStore.setRecapMsg("failed to call sell API & close trade on sell");
            upsertToBase(supabase);
            return {
              response: "failed to call buy API & close trade",
            };
          }
          coinInventoryStore.setQuantity(currency, 0);
        }
        else {
          streakStore.setStop(true);
          prepStore.setRecapMsg("No coins to sell");
        }
    
        upsertToBase(supabase);
        return {
          response: "stopped with : setSize = " + size + " and stop = " + stop,
          size: 1,
        };
      }
}