export class TodoItem {
    constructor(content, completed = false) {
        this.content = content;
        this.completed = completed;
    }

    toggleCompletion() {
        return new TodoItem(this.content, !this.completed);
    }
}
