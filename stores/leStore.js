import { defineStore } from "pinia";

export const useStreakStore = defineStore({
    id: "streakStore", // unique id of the store
    state: () => {
        return {
            USDT: 0,
            size: 1,
            leverage: 1,
            won: 0,
            loss: 0,
            preventFirstTrade: false,
            inTrade: false,
            stop: false,
            maxDrawdown: 5,
        }
    },
    actions: {
        addWin() {
            this.won++
        },
        addLoss() {
            this.loss++

        },
        setUSDT(USDT) {
            this.USDT = USDT
        },
        setSize(size) {
            this.size = size
        },
        setLeverage(leverage) {
            this.leverage = leverage
        },
        setWon(won) {
            this.won = won
        },
        setLoss(loss) {
            this.loss = loss
        },
        setPreventFirstTrade(preventFirstTrade) {
            this.preventFirstTrade = preventFirstTrade
        },
        setStop(stop) {
            this.stop = stop
        },
    },
    getters: {
        getUSDT: (state) => {
            return state.USDT
        },
        getSize: (state) => {
            return state.size
        },
        getLeverage: (state) => {
            return state.leverage
        },
        getWin: (state) => {
            return state.won
        },
        getLoss: (state) => {
            return state.loss
        },
        getPreventFirstTrade: (state) => {
            return state.preventFirstTrade
        },
        getStop: (state) => {
            return state.stop
        },
        getFirstRun: (state) => {
            return state.firstRun
        },
        getSummary: (state) => {
            return state.won - state.loss
        },
        getMaxDrawdown: (state) => {
            return state.maxDrawdown
        },
    }
})

export const usePrepStore = defineStore({
    id: "prepStore", // unique id of the store
    state: () => {
        return {
            USDT: 0,
            lastMultiplier: 0,
            maxDrawdown: 5,
            recapMsg: "Initialisation",
            status: "neutral",
            lastUSDT:0
        }
    },
    actions: {
        setUSDT (USDT) {
            this.USDT = USDT;
        },
        setLastMultiplier(lastMultiplier) {
            this.lastMultiplier = lastMultiplier
        },
        setMaxDrawdown(maxDrawdown) {
            this.maxDrawdown = maxDrawdown
        },
        setRecapMsg(recapMsg) {
            this.recapMsg = recapMsg
        },
        setStatus(status) {
            this.status = status
        },
        setLastUSDT(lastUSDT) {
            this.lastUSDT = lastUSDT
        },
    },
    getters: {
        getUSDT: (state) => {
            return state.USDT
        },
        getLastMultiplier: (state) => {
            return state.lastMultiplier
        },
        getMaxDrawdown: (state) => {
            return state.maxDrawdown
        },
        getRecapMsg: (state) => {
            return state.recapMsg
        },
        getStatus: (state) => {
            return state.status
        },
        getLastUSDT: (state) => {
            return state.lastUSDT
        },
    }
});

export const useCoinInventoryStore = defineStore({
    id: "coinInventoryStore", // unique id of the store
    state: () => {
        return {
            inventory: {},
        }
    },
    actions: {
        longCoin(coin, quantity = 1) {
            this.inventory[coin] = quantity;
        },
        shortCoin(coin, quantity = 1) {
            this.inventory[coin] = -quantity;
        },
        removeCoin(coin) {
            if (this.inventory[coin]) {
                delete this.inventory[coin];
            }
        },
        addQuantity(coin, quantity) {
            if (this.inventory[coin]) {
                this.inventory[coin] += quantity;
            }
            else {
                console.error(`Coin ${coin} not found in inventory`);
            }
        },
        setQuantity(coin, quantity) {
            if (this.inventory[coin]) {
                this.inventory[coin] = quantity;
            } else {
                console.error(`Coin ${coin} not found in inventory.`);
            }
        },
    },
    getters: {
        getInventory: (state) => {
            return state.inventory
        },
        getCoin: (state) => (coin) => {
            return state.inventory[coin]
        },
    }
});