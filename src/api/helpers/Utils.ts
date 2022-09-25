// import CryptoJs from 'crypto-js';
import Print from './Print';


export const randomNumber = (length: number): number => {
  let num = '';
  const possible = '1234567890';
  for (let i = 0; i <= length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    num += i > 0 && sup == i ? '0' : possible.charAt(sup);
  }
  return Number(num);
};
