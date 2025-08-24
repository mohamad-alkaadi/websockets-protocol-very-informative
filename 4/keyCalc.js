//allocate memory that holds 1 byte for each slot

let randomTypedArray = new Uint8Array(16)
// console.log(randomTypedArray)

crypto.getRandomValues(randomTypedArray)
// console.log(randomTypedArray)

let newRandomTypedArray = new Uint8Array(16)
// console.log(newRandomTypedArray)

for (let i = 0; i < newRandomTypedArray.length; i++) {
  newRandomTypedArray[i] = Math.floor(Math.random() * 255)
}
// console.log(newRandomTypedArray)

const str = String.fromCharCode.apply(null, randomTypedArray)
console.log(str)

const base64Str = btoa(str)

console.log(base64Str)
