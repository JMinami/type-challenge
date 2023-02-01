namespace MyExclude {
  type MyExclude<T, U> = T extends U ? never : T

  type Grade = "A" | "B"
  type a = MyExclude<Grade, "A">
  const aa:a = "B"
}