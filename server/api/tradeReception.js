import { useStreakStore, usePrepStore, useCoinInventoryStore } from "@/stores/leStore";
import { usePinia } from "../plugins/pinia";
import { long } from "./aBuy";
import { short } from "./aShort";
import { serverSupabaseClient } from '#supabase/server'
import { chosenCurrency } from "../currencyList";
import { getFromBase } from "../callGetFromBase";
import { upsertToBase } from "../callUpsertToBase";

export default defineEventHandler(async (event) => {

  const supabase = await serverSupabaseClient(event)

  const pinia = usePinia();

  const streakStore = useStreakStore(pinia);
  const prepStore = usePrepStore(pinia);
  const coinInventoryStore = useCoinInventoryStore(pinia);

  const body = await readBody(event);

  const USDT = 153.77//await accountUSDT();
  let currency = ""

  
  if (body.info === true){
    return {
      streakStore: streakStore.$state,
      prepStore: prepStore.$state,
      coinInventoryStore: coinInventoryStore.$state,
      }
      }
      
      // Facade #1
      currency = chosenCurrency(body);
      
      const baseAmount = prepStore.getUSDT;
      //const currencyGap = USDT - baseAmount;
      const lossCheck = baseAmount - USDT;
      
      const maxDrawdown = prepStore.getMaxDrawdown;
      
      let size = streakStore.getSize;
      let leverage = streakStore.getLeverage;
      let stop = streakStore.getStop;
      let lastUSDT = prepStore.getLastUSDT;
      let won = streakStore.getWin;
      let loss = streakStore.getLoss;

      let filterResponse = getFromBase(supabase);
    
      console.log("filterResponse: ", filterResponse);
    
    if (filterResponse.response !== undefined) {
      return filterResponse;
    }
      
  if (body && body.tradeType !== "long" && body.tradeType !== "short" && body.tradeType !== "sell") {
    streakStore.setStop(true);
    prepStore.setRecapMsg("Body content not recognized");
    upsertToBase(supabase);
    return {
      response: "Body content not recognized",
    };
  }

  if (body.tradeType === "long") {
    if (coinInventoryStore.getCoin(currency) < 0) {
      const buyResp = await long(currency, -coinInventoryStore.getCoin(currency) + size, leverage);
      coinInventoryStore.longCoin(currency, -coinInventoryStore.getCoin(currency));
      if (buyResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call buy API & close trade on long");
        upsertToBase(supabase);
        return {
          response: "failed to call buy API & close trade",
        };
      }
    }
    else if (coinInventoryStore.getCoin(currency) > 0) {
      prepStore.setRecapMsg("Position already open");
      upsertToBase(supabase);
      return {
        response: "Position already open",
      } 
    }
    else {
      const buyResp = await long(currency, size, leverage);
      if (buyResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call buy API & close trade on long");
        upsertToBase(supabase);
        return {
          response: "failed to call buy API & close trade",
        };
      }
      coinInventoryStore.longCoin(currency, size);  
    }
    prepStore.setRecapMsg("Bought coins");
    upsertToBase(supabase);
    return {
      currency: currency,
      inventory: coinInventoryStore.getCoin(currency),
    }
  } else if (body.tradeType === "short") { // DONT FORGET TO CHANGE THE API CALLS AFTER TESTING
    if (coinInventoryStore.getCoin(currency) > 0) {
      const shortResp = await short(currency, coinInventoryStore.getCoin(currency) + size, leverage);
      if (shortResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call sell API & close trade on short");
        upsertToBase(supabase);
        return {
         response: "failed to call buy API & close trade on short",
         };
       }
      coinInventoryStore.shortCoin(currency, coinInventoryStore.getCoin(currency));
    }
    else if (coinInventoryStore.getCoin(currency) < 0) {
      prepStore.setRecapMsg("Position already open");
      upsertToBase(supabase);
      return {
        response: "Position already open",
      }
    }
    else {
      const shortResp = await short(currency, size, leverage);
      if (shortResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call sell API & close trade on short");
        upsertToBase(supabase);
        return {
         response: "failed to call buy API & close trade on short",
         };
       }
      coinInventoryStore.shortCoin(currency, size);
    }
    prepStore.setRecapMsg("Shorted coins");
    upsertToBase(supabase);
    return {
      currency: currency,
      inventory: coinInventoryStore.getCoin(currency),
    }
  }
  else if (body.tradeType === "sell") {
    if(coinInventoryStore.getCoin(currency) >= 1){
      const sellResp = await short(currency, coinInventoryStore.getCoin(currency), leverage);
       if (sellResp.code !== "200000") {
         streakStore.setStop(true);
         prepStore.setRecapMsg("failed to call sell API & close trade on sell");
         upsertToBase(supabase);
         return {
          response: "failed to call buy API & close trade on sell",
          apiResp: sellResp,
          };
        }
        coinInventoryStore.setQuantity(currency, 0);
    }
    else if (coinInventoryStore.getCoin(currency) < 0){
      const sellResp = await long(currency, -coinInventoryStore.getCoin(currency), leverage);
      if (sellResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call sell API & close trade on sell");
        upsertToBase(supabase);
        return {
          response: "failed to call buy API & close trade on sell",
          apiResp: sellResp,
        };
      }
      coinInventoryStore.setQuantity(currency, 0);
    }
    else {
      //streakStore.setStop(true);
      prepStore.setRecapMsg("No coins to sell");
      //prepStore.setStatus("Stopped");
      coinInventoryStore.setQuantity(currency, 0);
      upsertToBase(supabase);
      return {
        response: "No coins to sell",
        stop: true,
      };
    }
    prepStore.setRecapMsg("Sold coins");
    upsertToBase(supabase);
    return {
      currency: currency,
      inventory: coinInventoryStore.getCoin(currency),
    }
  }

  if (lossCheck > maxDrawdown) {
    streakStore.setStop(true);
    streakStore.setSize(0);
    prepStore.setRecapMsg("Drawdown exceeded");
    prepStore.setLastMultiplier(multiplier);
    upsertToBase(supabase);
    return {
      response: "Drawdown exceeded",
      size: 0,
    };
  }
  if (lastUSDT < USDT) {
    streakStore.setWon(++won);
  } else if (lastUSDT > USDT) {
    streakStore.setLoss(++loss);
  }
// streakStore.status = strategyFilter(streakStore, currencyGap);

  upsertToBase(supabase);
  return {
    response: "Going good",
  };
});
