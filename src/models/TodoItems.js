import ImmutableTreeNode from './ImmutableTreeNode';

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

    indentTodo(todoToIndent) {
        var initialParent = todoToIndent.parent;

        var incompleteSiblings = initialParent.children.filter((c) => !c.completed);
        var todoIndex = incompleteSiblings.indexOf(todoToIndent);

        // Do nothing if todo doesn't have a valid preceeding sibling
        if (todoIndex < 1) return this;

        var targetParent = incompleteSiblings[todoIndex - 1];
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
