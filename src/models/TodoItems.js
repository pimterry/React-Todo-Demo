import ImmutableTreeNode from './ImmutableTreeNode';

// Immutable model representing a collection of Todos.
export default class TodoItems extends ImmutableTreeNode {
    constructor(todos = []) {
        super(null, todos, null, (newTodos) => new TodoItems(newTodos));
    }

    addTodo(newTodo) {
        return this.addChild(newTodo);
    }

    updateTodo(originalTodo, updatedTodo) {
        return this.updateChild(originalTodo, updatedTodo);
    }

    indentTodo(todoToIndent, filter) {
        var initialParent = todoToIndent.parent;

        var validSiblings = initialParent.children.filter(filter);
        var todoIndex = validSiblings.indexOf(todoToIndent);

        // Do nothing if todo doesn't have a valid preceeding sibling
        if (todoIndex < 1) return this;

        var targetParent = validSiblings[todoIndex - 1];
        return this.moveChild(todoToIndent, targetParent);
    }

    unindentTodo(todoToUnindent) {
        // Can't unindent nodes already at the root
        if (todoToUnindent.parent === this) return this;

        var targetParent = todoToUnindent.parent.parent;
        var targetIndex = targetParent.children.indexOf(todoToUnindent.parent) + 1;
        return this.moveChild(todoToUnindent, targetParent, targetIndex);
    }
}
