//import { storeToRefs } from "pinia";
import { usePinia } from "../plugins/pinia";
// import { useStreakStore } from "../../stores/leStore";
// import { writeFile, readFile } from 'fs/promises';
//import { fileAdapt, fileRead, fileWrite } from "../utils/fileMoves";

export default defineEventHandler(async (event: any) => {
  // const pinia = usePinia();
  // const streakStore = useStreakStore(pinia);

  // const newSize = streakStore.getSize;
  // let newWon = streakStore.getWin;
  // const newPrevent = streakStore.getPreventFirstTrade;
  // const newLoss = streakStore.getLoss;

  // streakStore.addWin();

  let dataFile: string = "";


  // try{
  //     const data : any = await readFile('server/niceTest.json');
  //     let parsedData = JSON.parse(data).text;
  //     console.log(++parsedData);
  //     dataFile = JSON.stringify(parsedData);
  // }catch(err){
  //     console.log('Error reading the file', err);
  // }

  // try {
  //     await writeFile(
  //         'server/niceTest.json', '{ "text": ' + dataFile + ' }'
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
    result: "Yeah no store",
    result2: "Yeah no" + dataFile
  };
});
