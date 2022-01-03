import { AES, enc } from 'crypto-js';

// String.prototype.replaceSlash = (str: string) => str.replace(/\//g, '%2F');
// String.prototype.restoreSlash = (str: string) => str.replace(/%2F/g, '/');

const key = process.env.NEXT_PUBLIC_CRYPTO_KEY as string;
// export const encrypt = (message: string) => {
//   const wordArray = enc.Utf8.parse(message);
//   return (
//     AES.encrypt(wordArray, key)
//     .toString()
//     .replace(/\//g, '%2F')
//   );
// };
export const encrypt = (message: string) => {
  return (
    AES.encrypt(message, key)
    .toString()
    .replace(/\//g, '%2F')
  );
};
export const decrypt = (encryptedMessage: string | undefined) =>
  encryptedMessage ?
    AES.decrypt(encryptedMessage.replace(/%2F/g, '/'), key).toString(enc.Utf8) :
    '';

// const message = 'you stinks';
// const encryptedMessage = encrypt(message);
// const decryptedMessage = decrypt(encryptedMessage);
// console.log(`
//   암호화 전: ${message},
//   암호화 후: ${encryptedMessage},
//   복호화 후: ${decryptedMessage},
// `);