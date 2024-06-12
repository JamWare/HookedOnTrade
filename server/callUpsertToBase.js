import {streakStore, prepStore, coinInventoryStore} from './callLeStore'

export const upsertToBase = async (supabase) => {

    const { data : dataToBase, error } = await supabase
    .from('StoreGrabber')
    .upsert({ id: 1,
      streakStore: streakStore.$state, 
      prepStore: prepStore.$state, 
      coinInventoryStore: coinInventoryStore.$state})
    .select()

    if (error){
      console.log("Error in upsertToBase: ", error)
    }
    else {
      return dataToBase;
    }
}