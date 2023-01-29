namespace MyReturnType {
  const fn = (v: boolean) => {
    if (v) return 1
    else return 2
  }

  type MyReturnType<T extends (...args: any[]) => any> = 
    T extends (...args: infer Args extends any[]) => infer ret
    ? ret
    : never
  
  type a = MyReturnType<typeof fn>

}