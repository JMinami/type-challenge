namespace ObjectEntries {
  type Objectentries<T extends {}, Key = keyof T> = Key extends keyof T
    ? [Key, T[Key]]
    : [];
    

  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = Objectentries<Model>
}