import { SearchParams } from "./search_types";

function main(){
  const url = new URL("https://www.curucuru-select.com/?category=111&page=1&search-type=default&category=bbbbb")
  const a = new SearchParams(url)
  a.print()
  console.log(a.toString())
  a.changeMeta("search-type", "brand")
  a.add("brand", ["1111"])
  a.changeMeta("page", 2)
  a.changeOption("category", ["111"])
  a.changeOption("brand", ["1234"])
  a.add("measurement", ["sleeve_length-100-2000"])
  a.add("high-price", 999)
  a.print()
  console.log(a.toString())
  a.delete("category", "measurement", "brand")
  console.log(a.toString())
}

function redirectBrand() {
  const url = new URL("https://www.curucuru-select.com/?cbid=2658573&csid=0&mode=cate&sort=score")
  const a = new SearchParams(url)
  if (a.isRedirect()){
    console.log("redirect brand", a.redirectPath())
  }
}

function redirectCategory() {
  const url = new URL("https://www.curucuru-select.com/?gid=1235574&mode=grp&sort=score")
  const a = new SearchParams(url)
  if (a.isRedirect()) {
    console.log("redirect category", a.redirectPath())
  }
}

function redirectNew() {
  const url = new URL("https://www.curucuru-select.com/?mode=srh&cid=&keyword=&sort=n")
  const a = new SearchParams(url)
  if (a.isRedirect()) {
    console.log("redirect new", a.redirectPath())
  }
}

function redirectF5(){
  const url = new URL("https://www.curucuru-select.com/?mode=f5&brand=1109829&page=1")
  const a = new SearchParams(url)
  if (a.isRedirect()){
    console.log("redirect f5", a.redirectPath())
  }
}
main();
redirectBrand();
redirectCategory();
redirectNew();
redirectF5();