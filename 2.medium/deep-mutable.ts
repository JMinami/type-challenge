namespace DeepMutable {
  type X = {
    readonly a: () => 1
    readonly b: string
    readonly c: {
      readonly d: boolean
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true
            readonly j: "s" 
          }
        }
      }
    }
  }

  type DeepMutable<T extends object> = {
    -readonly[Key in keyof T]: T[Key]
  }
  type a = DeepMutable<X>
}