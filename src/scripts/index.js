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

const n = 70;
const input = [];
for (let i = 0; i < n; i += 1) {
  const data = Math.floor(Math.random() * 100);
  input.push(data);
}

const bst = new Tree(input);
console.log(`Is tree balanced ${bst.isBalanced()}`);
console.log(`Level-Order ${bst.levelOrder()}`);
console.log(`Pre-Order ${bst.preOrder()}`);
console.log(`Post-Order ${bst.postOrder()}`);
console.log(`In-Order ${bst.inOrder()}`);

const new_n = 50;
for (let i = 0; i < new_n; i += 1) {
  const data = Math.floor(Math.random() * 100);
  input.push(data);
}

if (!bst.isBalanced()) {
  bst.rebalance();
}

if (bst.isBalanced) {
  console.log(`Is tree balanced ${bst.isBalanced()}`);
  console.log(`Level-Order ${bst.levelOrder()}`);
  console.log(`Pre-Order ${bst.preOrder()}`);
  console.log(`Post-Order ${bst.postOrder()}`);
  console.log(`In-Order ${bst.inOrder()}`);
}
