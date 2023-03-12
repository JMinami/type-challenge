namespace ToPremitive{
  type ToPremitive<T extends object> = {
    [Key in keyof T]: T[Key] extends string ? string 
      : T[Key] extends number ? number
      : T[Key] extends boolean ? boolean
      : T[Key] extends object ? ToPremitive<T[Key]>
      : never
    }
  
  type X = {
    name: 'Tom'
    age: 30,
    married: false,
    addr: {
      home: '1234'
      phone: '134'
    }
  }

  type a = ToPremitive<X>
  const b: a = {
    addr: {
      home: "tet",
      phone: "tes",
    },
    name: "",
    age: 53,
    married: true,
  }

}