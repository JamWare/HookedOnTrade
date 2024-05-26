import futuresSDK from "../plugins/kucoin";

export const accountUSDT = async () => {
    const FSDK = futuresSDK();
    const infoResp = await FSDK.futuresAccount('USDT');
    const accountUSDT = infoResp.data.accountEquity; 
    return accountUSDT;
};

export default defineEventHandler(async (event) => {

    let infoResp = {}
    const body = await readBody(event);
    const FSDK = futuresSDK();
    if (body) {
        infoResp = await FSDK.futuresAccount(body.currency);
    }
    else {
        infoResp = await FSDK.futuresAccount('USDT');
    }
    const accountUSDT = infoResp.data.accountEquity; 

    //Helpers
    //futuresSDK.futuresRiskLimit('XBTUSDTM', console.lo);
    //futuresSDK.futuresContractDetail('SHIBUSDTM', console.lo);

    
    return { "account": accountUSDT }; 
})