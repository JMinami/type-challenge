namespace PromiseAll {
  // your answers
declare function PromiseAll<T extends any[]>(values: readonly [...T]): 
  Promise<{[P in keyof T]: T[P] extends Promise<infer A> ? A : T[P]}>

  const p1 = Promise.resolve(3);
  const p2 = 42;
  const p3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo')
  })

  const p = PromiseAll([p1, p2, p3] as const)
}