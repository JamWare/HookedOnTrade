import futuresSDK from "../plugins/kucoin";

export const accountUSDT = async () => {
    const FSDK = futuresSDK();
    const infoResp = await FSDK.futuresAccount('USDT');
    const accountUSDT = infoResp.data.accountEquity; 
    return accountUSDT;
};

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const FSDK = futuresSDK();
    if (body) {
        const infoResp = await FSDK.futuresAccount(body.currency);
    }
    const infoResp = await FSDK.futuresAccount('USDT');
    const accountUSDT = infoResp.data.accountEquity; 

    //Helpers
    //futuresSDK.futuresRiskLimit('XBTUSDTM', console.log);
    //futuresSDK.futuresContractDetail('SHIBUSDTM', console.log);

    
    return { "account": accountUSDT }; 
})