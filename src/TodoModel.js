// Immutable model for a todo, to keep core logic and any mutation out of the views.
export class TodoItem {
    constructor(content, completed = false) {
        this.content = content;
        this.completed = completed;
    }

    updateContent(newContent) {
        return new TodoItem(newContent, this.completed);
    }

    toggleCompletion() {
        return new TodoItem(this.content, !this.completed);
    }
}
