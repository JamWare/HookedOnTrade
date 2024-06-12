import { usePinia } from "../plugins/pinia";
import { useStreakStore, usePrepStore, useCoinInventoryStore } from "@/stores/leStore";

export const callLeStore = () => {
    const pinia = usePinia();
    const streakStore = useStreakStore(pinia);
    const prepStore = usePrepStore(pinia);
    const coinInventoryStore = useCoinInventoryStore(pinia);
    
    return {streakStore, prepStore, coinInventoryStore};
}