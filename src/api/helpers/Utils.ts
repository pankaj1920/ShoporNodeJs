import CryptoJs from 'crypto-js';
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

export const encryptData = (data: string) => {
  return CryptoJs.AES.encrypt(data, process.env.CRYPTO_KEY)
}

export const decryptData = (data: string): string => {
  const hashData = CryptoJs.AES.decrypt(data, process.env.CRYPTO_KEY)
  const validData = hashData.toString(CryptoJs.enc.Utf8)
  Print.log(`Data => ${data} Hash => ${hashData} Valid => ${validData}`)
  return validData
}