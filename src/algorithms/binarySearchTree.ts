export class TreeNode<K, V> {
  left: TreeNode<K, V> | null;
  right: TreeNode<K, V> | null;

  constructor(public key: K, public value: V) {
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<K, V> {
  root: TreeNode<K, V> | null;

  constructor() {
    this.root = null;
  }

  get(key: K): V | null {
    return get(this.root, key);
  }

  set(key: K, value: V) {
    this.root = set(this.root, key, value);
  }
}

function get<K, V>(node: TreeNode<K, V> | null, key: K): V | null {
  if (node === null) {
    return null;
  }

  if (key < node.key) {
    return get(node.left, key);
  } else if (node.key < key) {
    return get(node.right, key);
  } else {
    return node.value;
  }
}

function set<K, V>(node: TreeNode<K, V> | null, key: K, value: V): TreeNode<K, V> {
  if (node === null) {
    return new TreeNode(key, value);
  }

  if (key < node.key) {
    node.left = set(node.left, key, value);
  } else if (node.key < key) {
    node.right = set(node.right, key, value);
  } else {
    node.value = value;
  }

  return node;
}
