
namespace Type3 {
  const invalidNum = -1;
  const invalidStr = "ini"

  // 配列を安全に操作するためのwrapper型
  type SafeArray<T, S = T> = {
    array: T[];
    type: S;
  }
  /* 使い方
    1. currentの値チェック
    2. valueの値チェック
    3. 1と2が正の場合、currentにvalueを追加
  */
  type CurrentTypeCheckAndSet<Current, Value = Current> = {
    checkCurrent: (param: unknown) => param is Current
    checkValue: (param: unknown) => param is Value
    setValue: (current: Current, next: Value) => Current
  }
  
  type SafeArrayType<WT, T> = {
    isArrayTypeFunc: (param: unknown) => param is WT,
    initArrayFunc: (param: T[]) => void;
    isElementTypeFunc: (param: unknown) => param is T,
  }
  const safeCategories: SafeArrayType<SafeCategories, CategoryID> = {
    isArrayTypeFunc: isSafeCategories,
    initArrayFunc: initSafeCategories,
    isElementTypeFunc: isCategory,
  }
  const safeBrands: SafeArrayType<SafeBrands, BrandID> = {
    isArrayTypeFunc: isSafeBrands,
    initArrayFunc: initSafeBrands,
    isElementTypeFunc: isBrand,
  }
  const safeStrings: SafeArrayType<SafeStrings, string> = {
    isArrayTypeFunc: isSafeStrings,
    initArrayFunc: initSafeStrings,
    isElementTypeFunc: isString,
  }

  // カテゴリー配列のwrapper型
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

  // ブランド配列のwrapper型
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
  function isString(param: unknown): param is string {return typeof param === "string"}

  // 検索タイプ
  const searchTypes = ["default", "category", "brand", "new"] as const;
  type SearchType = typeof searchTypes[number];
  const defaultSearchtype: SearchType = "default";
  const isSearchType = (arg: unknown): arg is SearchType => {
    if (typeof arg === "string") {
      return searchTypes.includes(arg as SearchType);
    }
    return false
  }

  // ソート
  const sorts = ["date+rev", "price", "price+asc", "discount", "score", "recommend"] as const;
  type Sort = typeof sorts[number];
  const defaultSort: Sort = "date+rev";
  const isSort = (arg: unknown): arg is Sort => {
    if (typeof arg === "string") {
      return sorts.includes(arg as Sort);
    }
    return false
  }

  // セール
  const sales = ["on", invalidStr] as const;
  type Sale = typeof sales[number];
  const isSale = (arg: unknown): arg is Sale => {
    if (typeof arg === "string") {
      return sales.includes(arg as Sale);
    }
    return false
  }
  const safeArrayTypes = [safeCategories, safeBrands, safeStrings]

  // 検索キーを安全に扱うための型
  type SafeSearchParams = {
    "search-type": SearchType
    sort: Sort
    category: SafeCategories
    brand: SafeBrands
    price: number
    sale: Sale
  } 
  let safeParams: SafeSearchParams = {
    "search-type": defaultSearchtype,
    sort: defaultSort,
    category: initSafeCategories([]),
    brand: initSafeBrands([]),
    price: invalidNum,
    sale: invalidStr,
  };
  const isKeyofSafeSearchParams = 
    (arg: string, params: SafeSearchParams): arg is keyof SafeSearchParams => 
    arg in params;

  // safe型から通常の型へ変換
  type SafeAnyArray = SafeArray<any>
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
    price: invalidNum,
    sale: invalidStr
  }

  const addNonSafety = (key: string, value: string) => {
    let temp: SafeSearchParams = safeParams;
    if (!isKeyofSafeSearchParams(key, temp)) return;
    let current = safeParams[key]

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

    type obj = {
      [k: string]: any
    }
    const obji: obj = {}
    obji[key] = current
    safeParams = {
      ...safeParams,
      ...obji
    }
  }

  const add = <Key extends keyof SearchParams>(key: Key, value: SearchParams[Key]) => {
    if (!isKeyofSafeSearchParams(key, safeParams)) return;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        addNonSafety(key, String(v))
      })
      return;
    }
    addNonSafety(key, String(value));
  }

  const param = (): SearchParams => {
    for (const key in safeParams) {
      if (!(isKeyofSafeSearchParams(key, safeParams))) continue;
      type obj = {
        [k: string]: any
      }
      const obji: obj = {}
      let current = safeParams[key]
      if (isSafeCategories(current)) {
        obji[key] = current.array
      }
      else if (isSafeBrands(current)) {
        obji[key] = current.array
      }
      else if (isSafeStrings(current)) {
        obji[key] = current.array
      } else {
        obji[key] = current;
      }
      params = {
        ...params,
        ...obji,
      }

    }
    return params
  }
  addNonSafety("test", "");
  addNonSafety("search-type", "new")
  addNonSafety("sort", "recommend")
  addNonSafety("brand", "9999");
  addNonSafety("brand", "9876")
  addNonSafety("category", "111")
  addNonSafety("sale", "on");
  addNonSafety("price", "price")
  addNonSafety("price", "10000")
  add("category", ["1", "333"])
  console.log(safeParams)
  console.log(param())
}