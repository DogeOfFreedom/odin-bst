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
  if (curr === null) {
    return;
  }

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

const findValue = (value, node) => {
  if (node.data === value) {
    return node;
  }

  if (node.data > value) {
    if (node.left === null) {
      return null;
    }
    return findValue(value, node.left);
  } else {
    if (node.right === null) {
      return null;
    }
    return findValue(value, node.right);
  }
};

const getValuesBFS = (node, queue) => {
  // Add children
  if (node.left !== null) {
    queue.unshift(node.left);
  }

  if (node.right !== null) {
    queue.unshift(node.right);
  }

  // queue not empty, proceed to next node in queue
  if (queue.length > 0) {
    let next = queue.pop();
    return [node.data, ...getValuesBFS(next, queue)];
  }
  // queue empty
  return [node.data];
};

const treeMapBFS = (node, cb, queue) => {
  // Add children
  if (node.left !== null) {
    queue.unshift(node.left);
  }

  if (node.right !== null) {
    queue.unshift(node.right);
  }

  // apply cb to current node
  node.data = cb(node.data);

  // proceed to next node in queue, if exists
  if (queue.length > 0) {
    let next = queue.pop();
    treeMapBFS(next, cb, queue);
  }
};

const getValuesDFS = (node, op1, op2, op3) => {
  // current node is null
  if (node === null) {
    return [];
  }

  // leaf node
  if (node.left === null && node.right === null) {
    return [node.data];
  } else {
    const operations = {
      L: getValuesDFS(node.left, op1, op2, op3),
      D: [node.data],
      R: getValuesDFS(node.right, op1, op2, op3),
    };
    return [...operations[op1], ...operations[op2], ...operations[op3]];
  }
};

const treeMapDFS = (node, cb, op1, op2, op3) => {
  // current node is null
  if (node === null) {
    return;
  }

  // leaf node
  if (node.left === null && node.right === null) {
    node.data = cb(node.data);
    return;
  } else {
    const options = {
      L: treeMapDFS(node.left, cb, op1, op2, op3),
      D: (node.data = cb(node.data)),
      R: treeMapDFS(node.right, cb, op1, op2, op3),
    };

    options[op1];
    options[op2];
    options[op3];
  }
};

const getHeight = (node) => {
  if (node === null) {
    return 0;
  }

  if (node.left === null && node.right === null) {
    return 1;
  } else {
    return Math.max(1 + getHeight(node.left), 1 + getHeight(node.right));
  }
};

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const cleanedArray = mergeSort([...new Set(array)]);
    return buildBST(cleanedArray);
  }

  insert(value) {
    insertNode(value, this.root);
  }

  deleteItem(value) {
    deleteNode(value, null, this.root);
  }

  find(value) {
    return findValue(value, this.root);
  }

  levelOrder(callback = null) {
    if (callback === null) {
      return getValuesBFS(this.root, []);
    } else {
      treeMapBFS(this.root, callback, []);
    }
  }

  inOrder(callback = null) {
    if (callback === null) {
      return getValuesDFS(this.root, "L", "D", "R");
    } else {
      treeMapDFS(this.root, callback, "L", "D", "R");
    }
  }

  preOrder(callback = null) {
    if (callback === null) {
      return getValuesDFS(this.root, "D", "L", "R");
    } else {
      treeMapDFS(this.root, callback, "D", "L", "R");
    }
  }

  postOrder(callback = null) {
    if (callback === null) {
      return getValuesDFS(this.root, "L", "R", "D");
    } else {
      treeMapDFS(this.root, callback, "L", "R", "D");
    }
  }

  height(node) {
    return getHeight(node);
  }
}
