let currency = 'currency not found';

export const chosenCurrency = (body) => {
    const currencyMap = {
        "PEPE": "PEPEUSDTM",
        "SHIB": "SHIBUSDTM",
        "LADYS": "10000LADYSUSDTM",
        "SOLUSD": "SOLUSDTM",
        "DOGE": "DOGEUSDTM",
        "BTC": "XBTUSDTM",
        "AVAX": "AVAXUSDTM",
        "AAVE": "AAVEUSDTM",
        "OPUSD": "OPUSDTM",
        "ETH": "ETHUSDTM",
        "FLOKI": "FLOKIUSDTM",
        "ADA": "ADAUSDTM",
        "DOT": "DOTUSDTM",
        "BNB": "BNBUSDTM",
        "MEW": "MEWUSDTM",
        "RUNE": "RUNEUSDTM",
        "PEOPLE": "PEOPLEUSDTM",
        "PIX": "PIXELUSDTM",
        "STARL": "10000STARLUSDTM",
        "1INCH": "1INCHUSDTM",
        "SAGA": "SAGAUSDTM",
        "REN": "RENUSDTM",
        "RSR": "RSRUSDTM",
        "ZERO": "ZEROUSDTM",
        "SAND": "SANDUSDTM",
        "ACE": "ACEUSDTM",
        "PEPE2": "1000PEPE2USDTM",
        "OCEAN": "OCEANUSDTM",
        "AGIX": "AGIXUSDTM",
        "AI": "AIUSDTM",
        "ALICE": "ALICEUSDTM",
        "CELL": "CELLUSDTM",
        "ENA": "ENAUSDTM",
        "BOME": "BOMEUSDTM",
        "DRIFT": "DRIFTUSDTM",
        "BRETT": "BRETTUSDTM",
      }
    
      for (let key in currencyMap) {
        if (body.currency.includes(key)) {
          currency = currencyMap[key];
          break;
        }
      }
      return currency;
}