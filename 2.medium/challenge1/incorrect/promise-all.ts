namespace PromiseAll {
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject)=> {
    setTimeout(resolve, 100, 'foo')
  })

  declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
    [k in keyof T]: Awaited<T[k]>
  }>

  const p = PromiseAll([promise1, promise2, promise3] as const)
  console.log(p)
}
