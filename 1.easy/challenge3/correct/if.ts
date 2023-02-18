namespace If {
  type If<B extends boolean, T, U> = 
    B extends true ? T: U
  
  type A = If<true, 'a', 'b'>
}