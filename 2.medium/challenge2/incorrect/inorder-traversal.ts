namespace InorderTraversal {
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left:null,
        right: null,
      },
      right: null,
    }
  } as const

  type Tree = {
    val: number,
    left: null | Tree,
    right: null | Tree
  }
  type RightTree = {
    val: number,
    left: null,
    right: Tree,
  }
  type LeftTree = {
    val: number,
    left: Tree,
    right: null
  }
  type TwinTree = {
    val: number,
    left: Tree,
    right: Tree,
  }
  type InorderTraversal<T extends Tree, S extends Array<number> = []> = 
    T extends RightTree
    ? InorderTraversal<T["right"], [...S,T["val"]]>
    : T extends LeftTree
      ? InorderTraversal<T["left"], [T["val"], ...S]> 
      : T extends TwinTree
        ? [...InorderTraversal<T["left"], [T["val"], ...S]>, ...InorderTraversal<T["right"], [...S, T["val"]]>]
        : [...S]
  
  type A= InorderTraversal<typeof tree1>
}