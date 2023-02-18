namespace Includes {
  type Includes<T extends any[], U> 
    = T extends [...infer R]
      ? U extends R[number]
        ? true
        : false
      : never
  type a = Includes<[1, 2, 'a'], 'a'>
  type c = Includes<[1, 2, 'a'], 'b'>
}