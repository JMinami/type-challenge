namespace Flip {
  type Flip<T extends { [x: string]: any}> 
  = {
    [Key in keyof T as `${T[Key]}`]: Key
  }

  type a = Flip<{a: "1"}>
}