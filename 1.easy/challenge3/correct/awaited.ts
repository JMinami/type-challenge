namespace a{
  type MyAwaited<T> = 
  T extends Promise<infer R>
  ? R
  : never

  type Result = MyAwaited<Promise<string>>
}