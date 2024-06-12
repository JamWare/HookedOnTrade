  
export const strategyFilter = async (streakStore, currencyGap) => {
  switch (currencyGap) {
    case currencyGap < 0:
      streakStore.size = 1;
      streakStore.leverage = 3;
      streakStore.status = "negative";
      break;
    case currencyGap >= 0 && currencyGap < 0.2:
      streakStore.size = 1;
      streakStore.leverage = 3;
      streakStore.status = "neutral";
      break;
    case currencyGap > 0.2 && currencyGap < 0.7:
      streakStore.size = 2;
      streakStore.leverage = 3;
      streakStore.status = "neutral";
      break;
    case currencyGap > 0.7 && currencyGap < 1:
      streakStore.size = 4;
      streakStore.leverage = 4;
      streakStore.status = "neutral";
      break;
    case currencyGap > 1 && currencyGap < 1.5:
      streakStore.size = 5;
      streakStore.leverage = 4;
      streakStore.status = "neutral";
      break;
    case currencyGap > 1.5 && currencyGap < 2:
      streakStore.size = 7;
      streakStore.leverage = 5;
      streakStore.status = "a bit positive";
      break;
    case currencyGap > 2 && currencyGap < 4:
      streakStore.size = 9;
      streakStore.leverage = 6;
      streakStore.status = "better positive";
      break;
    case currencyGap > 4 && currencyGap < 6:
      streakStore.size = 13;
      streakStore.leverage = 7;
      streakStore.status = "on going positive";
      break;
    case currencyGap > 6 && currencyGap < 8:
      streakStore.size = 15;
      streakStore.leverage = 8;
      streakStore.status = "close to top positive";
      break;
    case currencyGap > 8 && currencyGap < 10:
      streakStore.size = 18;
      streakStore.leverage = 6;
      streakStore.status = "well done positive";
      break;
    case currencyGap > 10:
      streakStore.size = 20;
      streakStore.leverage = 10;
      streakStore.status = "max positive";
      break;
  }
  size = streakStore.size;
  leverage = streakStore.leverage;

  return {
    status: streakStore.status,
  }
}