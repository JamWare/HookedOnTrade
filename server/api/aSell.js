import futuresSDK from "../plugins/kucoin";

const FSDK = futuresSDK();

export const sell = async (setSymbol, setSize, setLeverage) =>
  await FSDK.futuresSell(
    {
      symbol: setSymbol,
      leverage: setLeverage,
      size: setSize,
    }
  );

export default defineEventHandler(async (event) => {

  const sellResp = "Sell Response";

  return { response: sellResp };
});
