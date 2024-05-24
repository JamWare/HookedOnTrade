import futuresSDK from "../plugins/kucoin";

const FSDK = futuresSDK();

export const long = async (setSymbol, setSize, setLeverage) =>
  await FSDK.futuresBuy(
    {
      symbol: setSymbol,
      leverage: setLeverage,
      size: setSize,
    }
  );

export default defineEventHandler(async (event) => {

  const baseAmount = 156;
  let response = "";
  let setSize = streakStore.getSize;
  let toStop = streakStore.getStop;
  let maxDrawdown = 5; // USDT Value
  let toleverage = streakStore.getLeverage;
  const isFirstRun = streakStore.getFirstRun;

  const infoResp = await FSDK.futuresAccount("USDT");
  const accountUSDT = infoResp.data.accountEquity;

  return {
    response: buyResp,
    size: setSize,
  };
});
