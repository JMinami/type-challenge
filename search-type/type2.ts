type SafeTypeArray = {
  array: [];
  type: any;
}

type MakeSafeTypeArray<T extends PropertyKey>
= {
  [Key in keyof SafeTypeArray]: 
    Key extends "array" ? T[] : Key extends "type"
      ? T : never;
}

type SafeTypeNumbers = MakeSafeTypeArray<number>
type SafeTypeStrings = MakeSafeTypeArray<string>

function isSafeTypeNumbers(param: unknown): param is SafeTypeNumbers {
  const saleTypeArrays = param as SafeTypeNumbers;
  if (saleTypeArrays.array === undefined || saleTypeArrays.type === undefined) {
    return false
  }
  return typeof saleTypeArrays.type === "number" 
}

function isSafeTypeStrings(param: unknown): param is SafeTypeStrings {
  const saleTypeArrays = param as SafeTypeStrings;
  if (saleTypeArrays.array === undefined || saleTypeArrays.type === undefined) {
    return false
  }
  return typeof saleTypeArrays.type === "string" 
}

function isSale(arg: string): arg is saleType {
  return sales.includes(arg as saleType)
} 

const safeTypeNumbers: SafeTypeNumbers = {
  array: [1, 2],
  type: 0,
}
const safeTypeStrings: SafeTypeStrings = {
  array: ["1"],
  type: "",
}

const makeNumbers = (nums: number[]): SafeTypeNumbers => ({array: nums, type: 0})
const makeStrings = (strs: string[]): SafeTypeStrings => ({array: strs, type: ""})
const sales = ["on", "invalid"] as const;
type saleType = typeof sales[number];
type option = {
  category: SafeTypeStrings,
  price: SafeTypeNumbers,
  sale: saleType,
  stock: number,
}
let options: option = {
  category: makeStrings([]),
  price: makeNumbers([]),
  sale: "invalid",
  stock: -1,
}

const add = (key: keyof option, value: string) => {
  let current = options[key];
  if (isSafeTypeNumbers(current)) {
    if (!isNaN(Number(value))) {
      current.array.push(Number(value));
    }
    return;
  }
  if (isSafeTypeStrings(current)) {
    current.array.push(value) 
    return
  }
  if (typeof current === "number") {
    if (!isNaN(Number(value))){
      current = Number(value);
    }
    return;
  }
  if (isSale(current) && isSale(value))  {
    current = value
    return;
  }
}

add("category", "category")
console.log(options)
add("price", "1")
console.log(options)
add("sale", "category")
console.log(options)
add("sale", "on")
console.log(options)
add("stock", "1")
console.log(options)