


export const randomNumber = (length: number): number => {
  let num = '';
  const possible = '1234567890';
  for (let i = 0; i <= length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    num += i > 0 && sup == i ? '0' : possible.charAt(sup);
  }
  return Number(num);
};


// declare global {
//   interface Array<T> {
//     isEmpty(): Boolean
//   }
// }

// Array.prototype.isEmpty = function () {
//   return this.length <= 0
// }