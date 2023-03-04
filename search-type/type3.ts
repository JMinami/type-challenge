namespace Type3 {
  const initialNum = -1;
  const initialStr = "ini"

  // 配列を安全に操作するためのwrapper型
  type SafeArray<T, S = T> = {
    array: T[];
    type: S;
  }

  type SafeAnyArray = SafeArray<any>
  function isSafeArray(param: unknown): param is SafeAnyArray {
    if (param && typeof param == "object") return ("array" in param && "type" in param)
    return false 
  }

  // カテゴリーのwrapper型
  type SafeCategories = SafeArray<CategoryID, "category">
  type CategoryID = `${number}`
  function initSafeCategories(categories: CategoryID[]): SafeCategories {return {array: categories, type: "category"}}
  function isSafeCategories(param: unknown): param is SafeCategories{
    if (param && typeof param == "object") {
      if ("array" in param && "type" in param )return param.type === "category"
    }
    return false
  }
  function isCategory(param: unknown): param is CategoryID{
    if (param && typeof param == "string") return !isNaN(Number(param))
    return false
  }

  // ブランドのwrapper型
  type SafeBrands = SafeArray<BrandID, "brand">
  type BrandID = `${number}`
  function initSafeBrands(brands: BrandID[]): SafeBrands{return {array: brands, type: "brand"}}
  function isSafeBrands(param: unknown): param is SafeBrands {
    if (param && typeof param == "object") {
      if ("array" in param && "type" in param) return param.type === "brand"
    }
    return false
  }
  function isBrand(param: unknown): param is BrandID {
    if (param && typeof param == "string") return !isNaN(Number(param))
    return false
  }

  // 文字配列のwrapper型
  type SafeStrings = SafeArray<string, "string">
  function initSafeStrings(strs: string[]):SafeStrings{return{array: strs, type: "string"}}
  function isSafeStrings(param: unknown): param is SafeStrings {
    if (param && typeof param == "object") {
      if ("array" in param && "type" in param )return param.type === "string"
    }
    return false
  }

  // 検索タイプ
  const searchTypes = ["default", "category", "brand", "new"] as const;
  type SearchType = typeof searchTypes[number];
  const defaultSearchtype: SearchType = "default";
  function isSearchType (arg: unknown): arg is SearchType {
    if (typeof arg === "string") {
      return searchTypes.includes(arg as SearchType);
    }
    return false
  }

  // ソート
  const sorts = ["date+rev", "price", "price+asc", "discount", "score", "recommend"] as const;
  type Sort = typeof sorts[number];
  const defaultSort: Sort = "date+rev";
  function isSort(arg: unknown): arg is Sort {
    if (typeof arg === "string") {
      return sorts.includes(arg as Sort);
    }
    return false
  }

  // セール
  const sales = ["on", initialStr] as const;
  type Sale = typeof sales[number];
  function isSale(arg: unknown): arg is Sale {
    if (typeof arg === "string") return sales.includes(arg as Sale);
    return false
  }

  // 検索キーを安全に扱うための型
  type SafeSearchParams = {
    "search-type": SearchType
    sort: Sort
    category: SafeCategories
    brand: SafeBrands
    color: SafeStrings
    size: SafeStrings
    price: SafeStrings
    "high-price": number
    "low-price": number
    sale: Sale
  } 
  let safeParams: SafeSearchParams = {
    "search-type": defaultSearchtype,
    sort: defaultSort,
    category: initSafeCategories([]),
    brand: initSafeBrands([]),
    color: initSafeStrings([]),
    size: initSafeStrings([]),
    price: initSafeStrings([]),
    "high-price": initialNum,
    "low-price": initialNum,
    sale: initialStr,
  } satisfies SafeSearchParams;

  const isKeyofSafeSearchParams = 
    (arg: string, params: SafeSearchParams): arg is keyof SafeSearchParams => 
    arg in params;

  // safe型から通常の型へ変換
  type MakeSafeToSearchParams<T = SafeSearchParams> = {
    [Key in keyof T]: T[Key] extends SafeAnyArray ? T[Key]["array"] : T[Key]
  }

  // 検索条件型
  type SearchParams = MakeSafeToSearchParams
  let params: SearchParams = {
    "search-type": defaultSearchtype,
    sort: defaultSort,
    category: [],
    brand: [],
    color: [],
    size: [],
    price: [],
    "high-price": initialNum,
    "low-price": initialNum,
    sale: initialStr
  }

  const dengeroulyAdd= (key: string, value: string) => {
    if (!isKeyofSafeSearchParams(key, safeParams)) return;
    let current = safeParams[key]

    /*
      同じことを繰り返しているので
      ↓のようにループでやろうとすると型ガードが効かなくなるので断念

      type Operator {
        isCurrentGuard: (param) param is Current
        isValueGuard: (param) param is Value
        setValueToCurrent: (current, value)
      }
      const operations: Operator[] = [searchOperator, sortOperator, categoryOperator, ...]

      for (const o of operatins) {
        if (o.isCurrentGuard(current)){
          if (o.isValueGurad(value)) o.setValueToCurrent(current, value);
        }
      }
    */

    if (isSearchType(current)) {
      if (isSearchType(value)) current = value;
    }
    else if (isSort(current)) {
      if (isSort(value)) current = value;
    }
    else if (isSafeCategories(current)) {
      if (isCategory(value)) current.array.push(value)
    }
    else if (isSafeBrands(current)) {
      if (isBrand(value)) current.array.push(value)
    }
    else if (isSafeStrings(current)) {
      current.array.push(value)
    }
    else if (typeof current === "number") {
      if (!isNaN(Number(value))) current = Number(value)
    }
    else if (isSale(current)) {
      if (isSale(value)) current = value;
    } 
    else {
      return;
    }
    safeParams = {
      ...safeParams,
      ...{[key]: current}
    }
  }

  const add = <Key extends keyof SearchParams>(key: Key, value: SearchParams[Key]) => {
    if (!isKeyofSafeSearchParams(key, safeParams)) return;
    if (Array.isArray(value)) {
      value.forEach(v => dengeroulyAdd(key, String(v)))
      return;
    }
    dengeroulyAdd(key, String(value));
  }

  const dengeroulyDelete = (key: string) => {
    if (!isKeyofSafeSearchParams(key, safeParams)) return;
    let current = safeParams[key];

    if (isSearchType(current)) {
      current = defaultSearchtype;
    } 
    else if (isSort(current)) {
      current = defaultSort;
    } 
    else if (isSafeArray(current)) {
      current.array = []
    }
    else if (typeof current == "number") {
      current = initialNum;
    }
    else {
      current = initialStr
    }
    safeParams = {
      ...safeParams,
      ...{[key]: current}
    }
  }
  const delete1 = <Key extends keyof SearchParams>(key: Key) => {
    if (!isKeyofSafeSearchParams(key, safeParams)) return;
    dengeroulyDelete(key);
  }

  const param = (): SearchParams => {
    for (const key in safeParams) {
      if (!isKeyofSafeSearchParams(key, safeParams)) continue;
      const obj: {[k: string]: any} = {}
      const current = safeParams[key]
      if (isSafeArray(current)) {
        obj[key] = current.array
      } else {
        obj[key] = current;
      }
      params = {
        ...params,
        ...obj,
      }
    }
    return params
  }
  dengeroulyAdd("test", "");
  dengeroulyAdd("search-type", "new")
  dengeroulyAdd("sort", "recommend")
  dengeroulyAdd("brand", "9999");
  dengeroulyAdd("brand", "9876")
  dengeroulyAdd("category", "111")
  dengeroulyAdd("sale", "on");
  dengeroulyAdd("price", "price")
  dengeroulyAdd("price", "10000")
  dengeroulyDelete("price")
  dengeroulyDelete("brand")
  add("category", ["1", "333"])
  delete1("category")
  dengeroulyAdd("color", "white")
  dengeroulyAdd("size", "s")
  console.log(param())
  dengeroulyDelete("size")
  console.log(param())
}