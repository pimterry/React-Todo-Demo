// Immutable model for a todo, to keep core logic and any mutation out of the views.
export class TodoItem {
    constructor(content, completed = false) {
        this.content = content;
        this.completed = completed;
    }

    updateContent(newContent) {
        return copyWithChanges(this, { content: newContent });
    }

    toggleCompletion() {
        return copyWithChanges(this, { completed: !this.completed });
    }
}

// Convenience method to build a copy of a todo changing only the parameters provided
function copyWithChanges(todo, changes) {
    var constructorArgs = Object.assign({
        content: todo.content,
        completed: todo.completed
    }, changes);

    return new TodoItem(
        constructorArgs.content,
        constructorArgs.completed
    );
}
