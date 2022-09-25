import CryptoJs from 'crypto-js';
import Print from './Print';


export const encryptData = (data: string) => {
    return CryptoJs.AES.encrypt(data, process.env.CRYPTO_KEY)
    // return CryptoJs.AES.encrypt.hashSync(data, process.env.CRYPTO_KEY)
}

export const decryptData = (data: string): string => {
    const hashData = CryptoJs.AES.decrypt(data, process.env.CRYPTO_KEY)
    const validData = hashData.toString(CryptoJs.enc.Utf8)
    Print.log(`Data => ${data} Hash => ${hashData} Valid => ${validData}`)
    return validData
}