import { usePinia } from "./plugins/pinia";
import { useStreakStore, usePrepStore, useCoinInventoryStore } from "@/stores/leStore";

    const pinia = usePinia();
    export const streakStore = useStreakStore(pinia);
    export const prepStore = usePrepStore(pinia);
    export const coinInventoryStore = useCoinInventoryStore(pinia);
    