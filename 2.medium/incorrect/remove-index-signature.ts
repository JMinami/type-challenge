namespace RemoveIndexSignature {
  type RemoveIndexSignature<T> = {
    [K in keyof T as K extends `${infer Str}` ? Str: never]: T[K]
  }
  

  type Foo = {
    [key: string]:any;
    foo(): void;
  }
  type A = RemoveIndexSignature<Foo>
}