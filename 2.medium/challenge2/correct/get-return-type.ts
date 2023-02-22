namespace GetReturnType {
  type MyReturnType<F extends (...args: any)=>any>
  = F extends (...args: any) => infer R
  ? R
  : never

  const fn = (v:boolean) => v ? 1: 2
  type a = MyReturnType<typeof fn>
}