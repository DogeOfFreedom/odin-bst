import Tree from "./tree";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(arr);
prettyPrint(bst.root);

const testNode = bst.find(8);
console.log(bst.height(testNode));

// console.log(bst.levelOrder());
// console.log(bst.preOrder());
// console.log(bst.inOrder());
// console.log(bst.postOrder());

// const cb = (x) => x + 1;
// bst.levelOrder(cb);
// bst.preOrder(cb);
// bst.inOrder(cb);
// bst.postOrder(cb);
