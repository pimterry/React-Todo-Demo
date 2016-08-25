import uuid from 'uuid';
import ImmutableTreeNode from './ImmutableTreeNode';

export default class TodoItem extends ImmutableTreeNode {
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
        var args = Object.assign({}, this, changes);

        return new TodoItem(
            args.content,
            this.id, // <- note that we don't allow id changes
            args.completed,
            args.parent,
            args.children
        );
    }
}
