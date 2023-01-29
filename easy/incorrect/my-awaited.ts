namespace MyAwaited {
  type ExampleType = Promise<string>
  type CustomPromise<T> = {
    then: (onfulfilled: (arg: T) => any) => any
  }
  type MyAwaited<TPromise extends Promise<any> | CustomPromise<any>> = 
    TPromise extends Promise<infer InnerReturn>
    ? InnerReturn extends Promise<any>
      ? MyAwaited<InnerReturn>
      : InnerReturn
    : TPromise extends CustomPromise<infer TArg>
    ? TArg
    : TPromise;
  
}