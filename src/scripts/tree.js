import Node from "./node";

const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  } else {
    const mid = Math.floor(arr.length / 2);
    const first = arr.slice(0, mid);
    const last = arr.slice(mid, arr.length);
    return sort(mergeSort(first), mergeSort(last));
  }
};

const sort = (first, last) => {
  const sortedArray = [];
  while (first.length !== 0 && last.length !== 0) {
    if (first[first.length - 1] >= last[last.length - 1]) {
      sortedArray.unshift(first.pop());
    } else {
      sortedArray.unshift(last.pop());
    }
  }

  if (first.length > 0) {
    sortedArray.unshift(...first);
  } else if (last.length > 0) {
    sortedArray.unshift(...last);
  }
  return sortedArray;
};

const buildBST = (array) => {
  const mid = Math.floor(array.length / 2);
  const start = 0;
  const end = array.length;
  const root = new Node(array[mid]);
  const left = array.slice(start, mid);
  const right = array.slice(mid + 1, end);
  root.left = left.length > 0 ? buildBST(left) : null;
  root.right = right.length > 0 ? buildBST(right) : null;
  return root;
};

const insertNode = (value, node) => {
  // no duplicate values
  if (value < node.data) {
    if (node.left === null) {
      node.left = new Node(value);
    } else {
      insertNode(value, node.left);
    }
  } else if (value > node.data) {
    if (node.right === null) {
      node.right = new Node(value);
    } else {
      insertNode(value, node.right);
    }
  } else {
    return;
  }
};

const deleteNode = (value, prev, curr) => {
  if (value === curr.data) {
    // Leaf node
    if (curr.left === null && curr.right === null) {
      if (prev.left === curr) {
        prev.left = null;
      } else {
        prev.right = null;
      }
    }
    // two children
    else if (curr.left !== null && curr.right !== null) {
      const succ = findSmallest(curr.right);
      deleteNode(succ, curr, curr.right);
      curr.data = succ;
    }
    // one child
    else {
      if (curr.left !== null) {
        curr.data = curr.left.data;
        curr.left = null;
      } else {
        curr.data = curr.right.data;
        curr.right = null;
      }
    }
  } else {
    if (value > curr.data) {
      deleteNode(value, curr, curr.right);
    } else if (value < curr.data) {
      deleteNode(value, curr, curr.left);
    }
  }
};

const findSmallest = (root) => {
  if (root === null) {
    return 0;
  }

  if (root.left === null && root.right === null) {
    return root.data;
  }

  const mid = root.data;
  const left = root.left !== null ? findSmallest(root.left) : Infinity;
  const right = root.right !== null ? findSmallest(root.right) : Infinity;

  return Math.min(mid, left, right);
};

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const cleanedArray = mergeSort([...new Set(array)]);
    console.log("start");
    console.log(cleanedArray);
    return buildBST(cleanedArray);
  }

  insert(value) {
    insertNode(value, this.root);
  }

  deleteItem(value) {
    deleteNode(value, null, this.root);
  }
}
