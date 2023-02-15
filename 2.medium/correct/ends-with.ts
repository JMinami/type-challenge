namespace EndsWith {
  type EndsWith<T extends string, U extends string> = 
    T extends `${infer Start}${U}` 
    ? true
    : false
  
  type a = EndsWith<'abc', 'bc'>
  type b = EndsWith<'abc', 'abc'>
  type c = EndsWith<'abc', 'd'>
}