namespace Unshift {
  type Unshift<T extends Array<any>, U>
    = [U, ...T]
  
  type Result = Unshift<[1, 2], 0>
}