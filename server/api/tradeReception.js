import { accountUSDT } from "./accInfo";
import { useStreakStore, usePrepStore } from "@/stores/leStore";
import { usePinia } from "../plugins/pinia";
import { long } from "./aBuy";
import { sell } from "./aSell";

export default defineEventHandler(async (event) => {
  let dataState = {};
  let prepState = {};
  const pinia = usePinia();

  const streakStore = useStreakStore(pinia);
  const prepStore = usePrepStore(pinia);

  const body = await readBody(event);

  const USDT = await accountUSDT();

  dataState = streakStore.$state;
  prepState = prepStore.$state;

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

  if (size < 1 || stop) {
    prepStore.setRecapMsg("Stopped with : setSize = " + size + " and stop = " + stop);
    streakStore.stop = true;
    streakStore.size = 0;
    return {
      response: "stopped with : setSize = " + size + " and stop = " + stop,
      size: 0,
    };
  }

  if (!preventFirstTrade) {
    if (body.tradeType === "long") {
      const sellResp = await long("SHIBUSDTM", size, leverage);
      if (sellResp.code !== "200000") {
        streakStore.stop = true;
        prepStore.setRecapMsg("failed to call sell API & close trade");
      }
    } else if (body.tradeType === "sell") {
      const buyResp = await sell("SHIBUSDTM", size, leverage);
      if (buyResp.code !== "200000") {
        streakStore.stop = true;
        prepStore.setRecapMsg("failed to call buy API & close trade");
      }
    }
  } else {
    preventFirstTrade = false;
    streakStore.setPreventFirstTrade(preventFirstTrade);
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

  if (body.tradeType === "long") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const buyResp = await long("SHIBUSDTM", size, leverage);

    if (buyResp.code !== "200000") {
      streakStore.stop = true;
      prepStore.setRecapMsg("failed to call buy API");
    }
  } else if (body.tradeType === "sell") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const sellResp = await sell("SHIBUSDTM", size, leverage);

    if (sellResp.code !== "200000") {
      streakStore.stop = true;
      prepStore.setRecapMsg( "failed to call sell API");
    }
  } else {
    streakStore.setStop(true);
    prepStore.setRecapMsg("Body content not recognized");
  }

  return {
    response: "Going good",
  };
});
