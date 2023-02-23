namespace Replace {
  type Replace<S extends string, W1 extends string, W2 extends string>
  = S extends `${infer Head}${W1}${infer Rest}`
  ? `${Head}${W2}${Rest}`
  : S

  type replaces = Replace<'types are fun!', 'fun', 'awesome'>
}