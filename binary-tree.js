'use strict';

class BinaryTree {
	constructor() {
        this.root = null;
	}

	insert(data) {
        var node = {
            data: data,
            left: null,
            right: null,
        };
        var current;

        if (this.root === null) {
            this.root = node;
        } else {
            current = this.root;

            while (true) {
            
                if (current.data > data) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
            
                } else if (current.data < data) {
                    if (current.right === null) {
                        current.right = node;
                        break;   
                    } else {
                        current = current.right;
                    }       

                } else {
                    break;
                }
            }
        }

	}


	contains(data) {
        var found = false,
            current = this.root;

        while (!found && current) {

            if (current.data > data) {
                current = current.left;
            } else if (current.data < data) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return found;

	}


    remove(data) {
        var found = false,
            parent = null,
            current = this.root,
            childCount,
            replacement,
            replacementParent;

        while (!found && current) {

            if (data < current.data){
                parent = current;
                current = current.left;

            } else if (data > current.data){
                parent = current;
                current = current.right;

            } else {
                found = true;
            }
        }

        if (found) {

            //count children
            childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

            //if foun node is root 
            if (current === this.root) {
                switch (childCount) {

                    // just remove tree  
                    case 0:
                        this.root = null;
                        break;

                    //use only child as the root
                    case 1:
                        this.root = (current.right === null ? current.left : current.right);
                        break;

                    //two children
                    case 2:
                        //new root will be the old root's left child
                        replacement = this.root.left;

                        //find the last right node 
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }
        
                        // if left subtree has right node, fins last
                        if (replacementParent) {
                            replacementParent.right = replacement.left;
                        
                        } else {
                            // if left subtree doesn't have right node
                            this.root.left = replacement.left;
                        }

                        this.root.data = replacement.data;
                        break;
                }        

            //non-root values
            } else {

                switch (childCount) {

                    case 0:
                        if (current.data < parent.data) {
                            parent.left = null;
                        } else {
                            parent.right = null;
                        }
                        break;

                    //one child, just reassign to parent
                    case 1:
                        if (current.data < parent.data) {
                            parent.left = (current.left === null ? current.right : current.left);
                        } else {
                            parent.right = (current.left === null ? current.right : current.left);
                        }
                        break;    

                    //two children
                    case 2:

                        //reset pointers for new traversal
                        replacement = current.left;
                        replacementParent = current;

                        //find the right-most node
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (current !== replacementParent) {
                            replacementParent.right = replacement.left;
                        } else {
                            current.left = replacement.left;
                        }   
                        current.data = replacement.data;
                        break;                    
                }

            }
        }
    }

    traverse (process) {
        function inOrder(node){
            if (node) {
                if (node.left !== null) {
                    inOrder(node.left);
                }            

                process.call(this, node);

                if (node.right !== null){
                    inOrder(node.right);
                }
            }
        }
        inOrder(this.root);
    }    

    size() {
        var length = 0;

        this.traverse(function(node) {
            length++;
        });

        return length;
    }

    isEmpty() {
        return this.root === null;
    }
}
