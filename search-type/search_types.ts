// 検索条件(ページ関連)
type MetaParams = ComposeSearchParam<metas>
type MetaKeys = GetKeys<metas>
type metas = [page, count, sort, searchType]
// 検索キーと型
type page = {key: "page", type: Number}
type count = {key: "count", type: Number}
type sort = {key: "sort", type: "date+rev"| "price" | "price+rev" | "score" | "discount" | "recommend"}
type searchType = {key: "search-type", type: "default" | "category" | "brand" | "new"}


// 検索条件(商品絞り込み)
type OptionParams = ComposeSearchParam<options>
type OptionKeys = GetKeys<options>
type options = [
  category, brand, color, size, price, sale, stock,
  lowPrice, highPrice, measurement, material, silhouette,
  spec, pattern, regular
]
// 検索キーと型
type category = {key: "category", type: categoryId[]}
type categoryId = `${number}`
type brand = {key: "brand", type: brandId[]}
type brandId = `${number}`
type color = {key: "color", type: String[]}
type size = {key: "size", type: String[]}
type price = {key: "price", type: String[]}
type sale = {key: "sale", type: "on" | InvalidStr}
type stock = {key: "stock", type: Number}
type lowPrice = {key: "low-price", type: Number}
type highPrice = {key: "high-price", type: Number}
type measurement = {key: "measurement", type: `${measurementID}-${number}-${number}`[]}
type measurementID = `sleeve_length` | "upper_body_length" | "waist" | "total_length"
type material = {key: "material", type: String[]}
type silhouette = {key: "silhouette", type: String[]}
type spec = {key: "spec", type: String[]}
type pattern = {key: "pattern", type: String[]}
type regular = {key: "regular", type: "on" | InvalidStr}


// 検索条件(古い商品絞り込み)
type OldOptionParams = ComposeSearchParam<oldOptions>
type OldOptionKeys = GetKeys<oldOptions>
type oldOptions = [mode, gid, cbid]
// 検索キーと型
type mode = {key: "mode", type: "f5" | "cate" | "grp" | "srh" | "invalid"}
type gid = {key: "gid", type: categoryId | InvalidStr}
type cbid = {key: "cbid", type: brandId | InvalidStr}

// 無効値
type InvalidArr = []
type InvalidStr = "invalid"
type InvalidNum = -1
const InvalidArr:InvalidArr = []
const InvalidNum:InvalidNum = -1
const InvalidStr:InvalidStr = "invalid"

// 検索条件(ページ関連)のdafault値
const defaultPage: page["type"] = 1
const defaultCount: count["type"] = 80
const defaultSort: sort["type"] = "date+rev"
const defaultSearchType: searchType["type"] = "default"

// 検索条件型
type SearchParam = {
  key: string // 検索キー
  type: String | String[] | Number // 検索条件の型
}

// 複合検索条件型の生成
type ComposeSearchParam<T extends SearchParam[]>
= { [Key in T[number] as Key["key"]]: Key["type"] }

// 検索キーの取得
type GetKeys<T extends SearchParam[]>
= T extends [infer First extends SearchParam, ...infer Rest extends SearchParam[]]
  ? First["key"] | GetKeys<Rest>
  : never

// 検索条件の型の取得
type GetTypes<Key extends MetaKeys | OptionKeys | OldOptionKeys, T> 
= T extends [infer First extends SearchParam, ...infer Rest extends SearchParam[]]
  ? First["key"] extends Key
    ? First["type"]
    : GetTypes<Key, Rest>
  : never

export class SearchParams<T> {
  private meta: MetaParams = {
    page: defaultPage,
    count: defaultCount,
    sort: defaultSort,
    "search-type": defaultSearchType,
  }
  private option: OptionParams = {
    category: InvalidArr,
    brand: InvalidArr,
    color: InvalidArr,
    size: InvalidArr,
    price: InvalidArr,
    sale: InvalidStr,
    stock: InvalidNum,
    "low-price": InvalidNum,
    "high-price": InvalidNum,
    measurement: InvalidArr,
    material: InvalidArr,
    silhouette: InvalidArr,
    spec: InvalidArr,
    pattern: InvalidArr,
    regular: InvalidStr,
  }
  private oldOption: OldOptionParams = {
    mode: InvalidStr,
    cbid: InvalidStr,
    gid: InvalidStr,
  }

  constructor(url: URL) {
    url.searchParams.forEach((value, key)=>{
      key = key.toLowerCase()
      if (key in this.meta) {
        this.changeMeta(key as MetaKeys, value as any);
      }
      if (key in this.option) {
        if (Array.isArray(this.option[key as keyof typeof this.option])){
          this.add(key as OptionKeys, [value] as any);
          return
        }
        this.add(key as OptionKeys, value as any)
      }
      if (key in this.oldOption) {
        this.addOld(key as OldOptionKeys, value as any)
      }
    })
  }
  toString(): string{
    const params: string[] = []
    for (const key in this.meta) {
      params.push(`${key}=${this.meta[key as keyof typeof this.meta]}`)
    }
    for (const key in this.option){
      const value = this.option[key as keyof typeof this.option]
      if (Array.isArray(value)){
        value.forEach(v => params.push(`${key}=${v}`))
        continue
      }
      if (typeof value === "number" && value !== InvalidNum) {
        params.push(`${key}=${value}`)
      }
      if (typeof value === "string" && value !== InvalidStr) {
        params.push(`${key}=${value}`)
      }
    }
    return `/search?${params.join("&")}`
  }

  add<T extends OptionKeys>(key: T, value: GetTypes<T, options>){
    if (Array.isArray(this.option[key]) && Array.isArray(value)){
      this.option[key] = [...this.option[key] as [], ...value] as any;
      return;
    }
    this.option[key] = value as any;
  }
  private addOld<T extends OldOptionKeys>(key: T, value: GetTypes<T, oldOptions>){
    this.oldOption[key] = value as any;
  }
  changeMeta<T extends MetaKeys>(key: T, value: GetTypes<T, metas>) {
    this.meta[key] = value as any;
  }
  changeOption<T extends OptionKeys>(key: T, value: GetTypes<T, options>) {
    this.option[key] = value as any;
  }
  delete(...keys: OptionKeys[]){
    for(const key of keys){
      if(Array.isArray(this.option[key])) this.option[key] = InvalidArr as any;
      if(typeof this.option[key] === "string") this.option[key] = InvalidStr as any;
      if(typeof this.option[key] === "number") this.option[key] = InvalidNum as any;
    }
  }
  isRedirect(): boolean {
    // modeに値がf5,cate,mode,grpの時リダイレクトする
    return (this.oldOption.mode!==InvalidStr)
  }
  redirectPath(): string {
    if (this.oldOption.mode==="cate" && this.oldOption.cbid!==InvalidStr) {
      this.changeMeta("search-type", "brand")
      this.changeMeta("sort", "recommend")
      this.changeOption("brand", [this.oldOption.cbid])
    } 
    if (this.oldOption.mode==="grp" && this.oldOption.gid!==InvalidStr) {
      this.changeMeta("search-type", "category")
      this.changeMeta("sort", "recommend")
      this.changeOption("category", [this.oldOption.gid])
    }
    if (this.oldOption.mode==="srh"){
      this.changeMeta("search-type", "new")
      this.changeMeta("sort", "recommend")
    }
    return this.toString()
  }
  print() {
    console.log(this.meta)
    console.log(this.option)
    console.log(this.oldOption)
  }
}