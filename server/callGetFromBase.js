import {streakStore, prepStore, coinInventoryStore} from './callLeStore'

export const getFromBase = async (supabase) => {

    const { data: dataFromBase, error } = await supabase
    .from('StoreGrabber')
    .select()
  
    if (dataFromBase){
      streakStore.$patch(dataFromBase[0].streakStore)
      prepStore.$patch(dataFromBase[0].prepStore)
      coinInventoryStore.$patch(dataFromBase[0].coinInventoryStore)
    }
    if (error){
      console.log("Error in getFromBase: ", error)
    }
    else {
      return dataFromBase;
    }
}