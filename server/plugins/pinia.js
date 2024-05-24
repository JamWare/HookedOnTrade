import { createPinia } from 'pinia';

let pinia;

export const usePinia = () => {
  if (!pinia) {
    pinia = createPinia();
  }
  return pinia;
};

export default usePinia;