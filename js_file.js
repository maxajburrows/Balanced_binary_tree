const Node = (data, leftChild=null, rightChild=null) => {
    return {data, leftChild, rightChild}
}

const Tree = (array) => {
    let root;
    if (array.length === 0) root = null;
    else root = buildTree(array);

    insert = function(data) {
        if (root === null) {
            this.root = Node(data);
            return
        }
        
        let currentNode = root;
        while (currentNode) {
            if (data === currentNode.data) return;
            else if (data < currentNode.data) {
                if (currentNode.leftChild === null) {
                    currentNode.leftChild = Node(data);
                    return;
                } else currentNode = currentNode.leftChild;
            } else { 
                if (currentNode.rightChild === null) {
                    currentNode.rightChild = Node(data);
                    return;
                } else currentNode = currentNode.rightChild;
            }
        }
    }
    insertRec = function (data) {
        if (root === null) {
            this.root = Node(data);
            return
        }
        insertRecMain(data, root);
    }
    const insertRecMain = (data, root) => {
        if (root === null) {
            root = Node(data);
            return root;
        }
        if (data === root.data) return root;
        else if (data < root.data) root.leftChild = insertRecMain(data, root.leftChild);
        else root.rightChild = insertRecMain(data, root.rightChild);
        return root;
    }

    remove = function (data, root=this.root) {
        if (root === null) return null;
        else if (data === root.data) return node_Replace(root);
        else if (data < root.data) root.leftChild = remove(data, root.leftChild);
        else root.rightChild = remove(data, root.rightChild);
        return root;
    }

    const node_Replace = (root) => {
        if (root.leftChild === null && root.rightChild === null) return null;
        else if (root.leftChild === null) return root.rightChild;
        else if (root.rightChild === null) return root.leftChild;
        else {
            root.data = root.leftChild.data;
            root.leftChild = node_Replace(root.leftChild);
            return root
        }
    }
    return {root, insert, insertRec, remove};
}

function buildTree (array) {
    array.sort((a, b) => (a - b));
    arrayNoDuplicates = removeDuplicates(array);
    return build(arrayNoDuplicates, 0, (arrayNoDuplicates.length-1));
}

function removeDuplicates (array) {
    let currentValue, previousValue;
    for (let i = 1; i < array.length; i++) {
        currentValue = array[i];
        previousValue = array[i-1];
        if (currentValue === previousValue) {
            array.splice(i, 1);
            i--;
        }
        if (i === array.length) break;
    }
    return array;
}

function build (array, start, end) {
    if (start > end) return null;
    
    let mid = Math.floor((start+end)/2);
    let node = Node(array[mid]);
    node.leftChild = build(array, start, mid-1);
    node.rightChild = build(array, mid+1, end);

    return node;
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


//let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testArrayGenerator = (short, long, max) => {
    let length = Math.round(short + Math.random()*(long-short));
    let testArray = [];
    for (let i = 0; i < length; i++) {
        testArray.push(Math.round(Math.random()*max));
    }
    return testArray;
}

testArray = testArrayGenerator(25,30,100);
//testArray = []
let testTree = Tree(testArray);
prettyPrint(testTree.root);
testTree.insert(72);
//testTree.insert(34);
//testTree.insertRec(28);
prettyPrint(testTree.root);