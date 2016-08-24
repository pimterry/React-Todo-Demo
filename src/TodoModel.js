// Immutable model for a todo, to keep core logic and any mutation out of the views.
export class TodoItem {
    constructor(content, completed = false, parent = null, children = []) {
        this.content = content;
        this.completed = completed;
        this.parent = parent;
        this.children = children;
    }

    updateContent(newContent) {
        return copyWithChanges(this, { content: newContent });
    }

    toggleCompletion() {
        return copyWithChanges(this, { completed: !this.completed });
    }

    setParent(newParent) {
        return copyWithChanges(this, { parent: newParent });
    }

    addChild(newChild) {
        return copyWithChanges(this, { children: this.children.concat(newChild) });
    }

    removeChild(childToRemove) {
        return copyWithChanges(this, { children: this.children.filter((c) => c !== childToRemove) });
    }
}

// Convenience method to build a copy of a todo changing only the parameters provided
function copyWithChanges(todo, changes) {
    var constructorArgs = Object.assign({
        content: todo.content,
        completed: todo.completed,
        parent: todo.parent,
        children: todo.children
    }, changes);

    return new TodoItem(
        constructorArgs.content,
        constructorArgs.completed,
        constructorArgs.parent,
        constructorArgs.children
    );
}
