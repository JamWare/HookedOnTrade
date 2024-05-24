import KuCoinFuturesSDK from "kucoin-futures-node-sdk";

import { secret } from "../secret";

const KuCoinFutures = KuCoinFuturesSDK.default;

const futuresSDK = () =>
  new KuCoinFutures({
    key: secret.API_KEY,
    secret: secret.API_SECRET,
    passphrase: secret.PASSPHRASE,
  });

export default futuresSDK;
