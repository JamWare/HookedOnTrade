import { usePinia } from "../plugins/pinia";
// import { useStreakStore } from "../../stores/leStore";

export default defineEventHandler(async (event: any) => {
  // const pinia = usePinia();
  // const streakStore = useStreakStore(pinia);

  // const newSize = streakStore.getSize;
  // let newWon = streakStore.getWin;
  // const newPrevent = streakStore.getPreventFirstTrade;
  // const newLoss = streakStore.getLoss;

  // streakStore.addLoss();
  let dataFile: string = "";


  // try {
  //     await writeFile(
  //         'server/current.json', '{ "size": '+ newSize +', "won": ' + newWon + '"loss": ' + newLoss + ', "preventFirstTrade": ' + newPrevent +' }'
  //     );
  //     console.log(
  //         'File written successfully');
  // } catch (err) {
  //     console.error('Error writing the file', err);
  // }

  return {
    // size: newSize,
    // won: newWon,
    // loss: newLoss,
    // preventFirstTrade: newPrevent,
    result: "ok",
  };
});
