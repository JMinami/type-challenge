namespace StartsWith {
  type StartsWith<T extends string, U extends string> = 
    T extends `${U}${infer End}`
    ? true
    : false


  type a = StartsWith<"abc", "ac">
  type b = StartsWith<"abc", "ab">
  type c = StartsWith<"abc", "abcd">
}