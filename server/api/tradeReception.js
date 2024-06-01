import { accountUSDT } from "./accInfo";
import { useStreakStore, usePrepStore, useCoinInventoryStore } from "@/stores/leStore";
import { usePinia } from "../plugins/pinia";
import { long } from "./aBuy";
import { short } from "./aShort";
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const supabase = await serverSupabaseClient(event)

  const pinia = usePinia();

  const streakStore = useStreakStore(pinia);
  const prepStore = usePrepStore(pinia);
  const coinInventoryStore = useCoinInventoryStore(pinia);

  const body = await readBody(event);

  const USDT = 153.77//await accountUSDT();
  let currency = ""


const { data, error } = await supabase
  .from('StoreGrabber')
  .upsert({ id: 1,
    streakStore: streakStore.$state, 
    prepStore: prepStore.$state, 
    coinInventoryStore: coinInventoryStore.$state})
  .select()

  console.log("data: ",data, ", error: ",error)

  if (body.info === true){
    return {
      streakStore: streakStore.$state,
      prepStore: prepStore.$state,
      coinInventoryStore: coinInventoryStore.$state,
    }
  }

  if (body.currency.includes("PEPE")){
    currency = "PEPEUSDTM";
  } else if (body.currency.includes("SHIB")){
    currency = "SHIBUSDTM";
  }
  else if (body.currency.includes("LADYS")){
    currency = "10000LADYSUSDTM";
  }
  else if (body.currency.includes("SOLUSD")){
    currency = "SOLUSDTM";
  }
  else if (body.currency.includes("DOGE")){
    currency = "DOGEUSDTM";
  }
  else if (body.currency.includes("BTC")){
    currency = "XBTUSDTM";
  }
  else if (body.currency.includes("AVAX")){
    currency = "AVAXUSDTM";
  }
  else if (body.currency.includes("AAVE")){
    currency = "AAVEUSDTM";
  }
  else if (body.currency.includes("OPUSD")){
    currency = "OPUSDTM";
  }
  else if (body.currency.includes("ETH")){
    currency = "ETHUSDTM";
  }
  else if (body.currency.includes("FLOKI")){
    currency = "FLOKIUSDTM";
  }
  else if (body.currency.includes("ADA")){
    currency = "ADAUSDTM";
  }
  else if (body.currency.includes("DOT")){
    currency = "DOTUSDTM";
  }
  else if (body.currency.includes("BNB")){
    currency = "BNBUSDTM";
  }
  else if (body.currency.includes("MEW")){
    currency = "MEWUSDTM";
  }
  else if (body.currency.includes("RUNE")){
    currency = "RUNEUSDTM";
  }
  else if (body.currency.includes("PEOPLE")){
    currency = "PEOPLEUSDTM";
  }
   else {
    currency = body.currency;
  }

  const baseAmount = prepStore.getUSDT;
  const currencyGap = USDT - baseAmount;
  const lossCheck = baseAmount - USDT;

  const maxDrawdown = prepStore.getMaxDrawdown;

  let size = streakStore.getSize;
  let leverage = streakStore.getLeverage;
  let stop = streakStore.getStop;
  let preventFirstTrade = streakStore.getPreventFirstTrade;
  let lastUSDT = prepStore.getLastUSDT;
  let won = streakStore.getWin;
  let loss = streakStore.getLoss;

  if (body && body.tradeType !== "long" && body.tradeType !== "short" && body.tradeType !== "sell") {
    streakStore.setStop(true);
    prepStore.setRecapMsg("Body content not recognized");
    return {
      response: "Body content not recognized",
    };
  }

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

    return {
      response: "stopped with : setSize = " + size + " and stop = " + stop,
      size: 1,
    };
  }

  if (body.tradeType === "long") {
    if (coinInventoryStore.getCoin(currency) < 0) {
      const buyResp = await long(currency, -coinInventoryStore.getCoin(currency) + size, leverage);
      coinInventoryStore.longCoin(currency, -coinInventoryStore.getCoin(currency));
      if (buyResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call buy API & close trade on long");
        return {
          response: "failed to call buy API & close trade",
        };
      }
    }
    else if (coinInventoryStore.getCoin(currency) > 0) {
      prepStore.setRecapMsg("Position already open");
      return {
        response: "Position already open",
      } 
    }
    else {
      const buyResp = await long(currency, size, leverage);
      if (buyResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call buy API & close trade on long");
        return {
          response: "failed to call buy API & close trade",
        };
      }
      coinInventoryStore.longCoin(currency, size);  
    }
    prepStore.setRecapMsg("Bought coins");
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
        return {
         response: "failed to call buy API & close trade on short",
         };
       }
      coinInventoryStore.shortCoin(currency, coinInventoryStore.getCoin(currency));
    }
    else if (coinInventoryStore.getCoin(currency) < 0) {
      prepStore.setRecapMsg("Position already open");
      return {
        response: "Position already open",
      }
    }
    else {
      const shortResp = await short(currency, size, leverage);
      if (shortResp.code !== "200000") {
        streakStore.setStop(true);
        prepStore.setRecapMsg("failed to call sell API & close trade on short");
        return {
         response: "failed to call buy API & close trade on short",
         };
       }
      coinInventoryStore.shortCoin(currency, size);
    }
    prepStore.setRecapMsg("Shorted coins");
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
        return {
          response: "failed to call buy API & close trade on sell",
          apiResp: sellResp,
        };
      }
      coinInventoryStore.setQuantity(currency, 0);
    }
    else {
      streakStore.setStop(true);
      prepStore.setRecapMsg("No coins to sell");
      prepStore.setStatus("Stopped");
      return {
        response: "No coins to sell",
        stop: true,
      };
    }
    prepStore.setRecapMsg("Sold coins");
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

  // switch (currencyGap) {
  //   case currencyGap < 0:
  //     dataFile.size = 1;
  //     dataFile.leverage = 3;
  //     dataFile.status = "negative";
  //     break;
  //   case currencyGap >= 0 && currencyGap < 0.2:
  //     dataFile.size = 1;
  //     dataFile.leverage = 3;
  //     dataFile.status = "neutral";
  //     break;
  //   case currencyGap > 0.2 && currencyGap < 0.7:
  //     dataFile.size = 2;
  //     dataFile.leverage = 3;
  //     dataFile.status = "neutral";
  //     break;
  //   case currencyGap > 0.7 && currencyGap < 1:
  //     dataFile.size = 4;
  //     dataFile.leverage = 4;
  //     dataFile.status = "neutral";
  //     break;
  //   case currencyGap > 1 && currencyGap < 1.5:
  //     dataFile.size = 5;
  //     dataFile.leverage = 4;
  //     dataFile.status = "neutral";
  //     break;
  //   case currencyGap > 1.5 && currencyGap < 2:
  //     dataFile.size = 7;
  //     dataFile.leverage = 5;
  //     dataFile.status = "a bit positive";
  //     break;
  //   case currencyGap > 2 && currencyGap < 4:
  //     dataFile.size = 9;
  //     dataFile.leverage = 6;
  //     dataFile.status = "better positive";
  //     break;
  //   case currencyGap > 4 && currencyGap < 6:
  //     dataFile.size = 13;
  //     dataFile.leverage = 7;
  //     dataFile.status = "on going positive";
  //     break;
  //   case currencyGap > 6 && currencyGap < 8:
  //     dataFile.size = 15;
  //     dataFile.leverage = 8;
  //     dataFile.status = "close to top positive";
  //     break;
  //   case currencyGap > 8 && currencyGap < 10:
  //     dataFile.size = 18;
  //     dataFile.leverage = 6;
  //     dataFile.status = "well done positive";
  //     break;
  //   case currencyGap > 10:
  //     dataFile.size = 20;
  //     dataFile.leverage = 10;
  //     dataFile.status = "max positive";
  //     break;
  // }
  // size = dataFile.size;
  // leverage = dataFile.leverage;
  // await fileWrite("prepnRecap.json", prepFile);

  return {
    response: "Going good",
  };
});
