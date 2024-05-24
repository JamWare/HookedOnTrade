export const secret = {
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  PASSPHRASE: process.env.PASSPHRASE,
  WHITELIST: (process.env.WHITELIST || "").split(","),
} as const;
