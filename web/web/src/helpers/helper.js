export const isEmptyString = (str) => {
    return !str || str.trim() === '';
  };
export const delay = (time) => {
    return new Promise(res => {
      setTimeout(res,time)
    })
}
export function romanize (num) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
// export const convertImageToBase64 = async (imagePath) => {

//     try {

//     const base64 = await RNFS.readFile(imagePath, 'base64');
//     return base64;

//     } catch (error) {

//     console.error('Error converting image to base64:', error);

//     return null;

//     }

// };