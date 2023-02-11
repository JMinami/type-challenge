namespace Includes {
  type Includes<T extends Array<any>, U> 
    = T extends [infer Current, ...infer Rest]
      ? U extends Current
        ? true
        : Includes<Rest, U>
      : false
      

  type isPillarMen = Includes<['t', 'k'], 'k'>
  type isPillarMen2 = Includes<['t', 'k'], 'c'>
}