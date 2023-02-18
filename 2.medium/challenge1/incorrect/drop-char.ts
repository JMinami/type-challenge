namespace DropChar {
  type DropChar<T extends string, U extends string> = 
    T extends `${infer First}${infer Rest}`
      ? First extends U
        ? DropChar<Rest, U>
        : `${First}${DropChar<Rest,U>}`
      : T
  type butterfly = DropChar<' b u t t e r f l y ! ', ' '>
}