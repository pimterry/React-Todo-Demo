// Immutable tree structure - lets you define and update a hierarchy of nodes without mutation.

// These could be done more efficiently, sticking with a simpler copy-frequently approach for now.
// Could potentially be done more simply mutably, but this does make the React-side API much simpler.
export default class ImmutableTreeNode {
    // Takes its state, and two callbacks to copy itself with a given change.
    constructor(parent, children, setParent, setChildren) {
        this.parent = parent;
        // Parentage automatically propagates down when you change a node
        this.children = children.map((c) => c.setParent(this));

        this.setChildren = setChildren;
        this.setParent = setParent;
    }

    addChild(newChild) {
        return this.setChildren(this.children.concat(newChild));
    }

    updateChild(originalChild, newChild) {
        return this.setChildren(this.children.map((child) => {
            if (child === originalChild) return newChild;
            else return child.updateChild(originalChild, newChild);
        }));
    }

    // The tricky bit! Recurses down the tree, dropping the existing node when it is found,
    // and adding it to the parent when that is found too.
    // Note that if the parent is the child, or any descendent of the child, then this effectively
    // just removes the child from the tree.
    moveChild(originalChild, targetParent, targetIndex = targetParent.children.length) {
        var updatedChildren = this.children.filter((child) => {
            return child !== originalChild;
        }).map((child) => child.moveChild(originalChild, targetParent));

        if (this === targetParent) {
            updatedChildren.splice(targetIndex, 0, originalChild);
        }

        return this.setChildren(updatedChildren);
    }

    getChildren(nodeMatcher = () => true) {
        return this.children.filter(nodeMatcher);
    }
}
