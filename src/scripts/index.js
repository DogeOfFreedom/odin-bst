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
// prettyPrint(bst.root);

bst.insert(10);
bst.insert(11);
bst.insert(12);
bst.insert(13);
bst.insert(14);
bst.insert(15);
bst.insert(16);
bst.insert(17);
bst.insert(18);
bst.insert(23);
prettyPrint(bst.root);
console.log(bst.levelOrder());

const test = bst.find(5);
console.log(bst.isBalanced());
bst.rebalance();
prettyPrint(bst.root);
