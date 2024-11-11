# Welcome to my very first public project, a personnal trading automation website

## The purpose 

Make my trading automatic and be able to learn how to use NuxtJS, TradingView API (as I was a fan of PinescriptV5 at the time) and a broker API.

## The technologies I used

I am using the NuxtJS Framework. The Frontside is in VueJS, the serverside is in JavaScript using nitroJS.
The trading caculation and data analysis + trading instruments are using the Pinescript V5 scripting language by TradingView.
I'm using TradingView API to get the signals on when to open and close a trading. 
I'm then sendings signals to my broker, Kukoin, on my account using their API.

## What works and what doesn't
Since the last time I used it, taking an order works, automatic orders works.
__Safeguards didn't work.__ 
I can't test it again right now since I stopped paying my subscription on TradingView.

## The next step

[] I plan on making a youtube video to show you how it works. It is planned between now and the end of november 2024. My apologies if it takes longer.

## What it needs

[] Unit Tests
[] CI/CD
[] TradeReception.js needs to be reworked for better readability.
[] More and better written safeguards if the user loses money.
[] Make the safeguards graphic
[] Have a visual cue of how the current strategy in play is performing.

## What I am doing right now
Taking online courses to replace TradingView by my own alternative.
I'm also learning how to use Machine Learning to improve my trades and automations.
My motivation comes from the biggest drawback : I didn't see how to backtest my trades for more than a week on TradingView. I'd like to be able to make backtests on 10 to 20 years to have a better chance of using a good trading strategy.
I'll also replace NuxtJS by Python. I really

## Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
