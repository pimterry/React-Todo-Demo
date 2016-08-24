import uuid from 'uuid';

// Immutable models for a set of todos and each single todo, to keep core logic and any mutation out of the views.
// These could be done more efficiently, sticking with a simpler copy-frequently approach for now.
// Could be done more simply mutably, but external API fits React much nicer this way

class ImmutableTreeNode {
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
    moveChild(originalChild, targetParent) {
        var updatedChildren = this.children.filter((child) => {
            return child !== originalChild;
        }).map((child) => child.moveChild(originalChild, targetParent));

        if (this === targetParent) updatedChildren.push(originalChild.setParent(this));

        return this.setChildren(updatedChildren);
    }
}

export class TodoItems extends ImmutableTreeNode {
    constructor(todos = []) {
        super(null, todos, null, (newTodos) => new TodoItems(newTodos));
    }

    addTodo(newTodo) {
        return this.addChild(newTodo);
    }

    updateTodo(originalTodo, updatedTodo) {
        return this.updateChild(originalTodo, updatedTodo);
    }

    indentTodo(todoToIndent) {
        var initialParent = todoToIndent.parent;
        var todoIndex = initialParent.children.indexOf(todoToIndent);

        // Do nothing if todo doesn't have a preceeding sibling
        if (todoIndex < 1) return this;

        var targetParent = initialParent.children[todoIndex - 1];
        return this.moveChild(todoToIndent, targetParent);
    }

    unindentTodo(todoToUnindent) {
        // Can't unindent nodes already at the root
        if (todoToUnindent.parent === this) return this;
        else return this.moveChild(todoToUnindent, todoToUnindent.parent.parent);
    }

    getIncomplete() {
        return this.children.filter((t) => !t.completed);
    }
}

export class TodoItem extends ImmutableTreeNode {
    constructor(content, id = uuid.v4(), completed = false, parent = null, children = []) {
        super(parent,
              children,
              (newParent) => this.copyWithChanges({ parent: newParent }),
              (newChildren) => this.copyWithChanges({ children: newChildren }));

        this.id = id;
        this.content = content;
        this.completed = completed;
    }

    updateContent(newContent) {
        return this.copyWithChanges({ content: newContent });
    }

    toggleCompletion() {
        return this.copyWithChanges({ completed: !this.completed });
    }

    // Convenience method to build a copy of this todo, changing only the parameters provided
    copyWithChanges(changes) {
        return new TodoItem(
            changes.content   || this.content,
            this.id,
            changes.completed || this.completed,
            changes.parent    || this.parent,
            changes.children  || this.children
        );
    }
}
