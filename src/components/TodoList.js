import React, { Component } from 'react';

import TodoItems from '../models/TodoItems';

import CollapsibleBlock from './CollapsibleBlock';
import TodoInput from './TodoInput';
import EditableTodoItem from './EditableTodoItem';

const Filters = {
    "Incomplete Tasks": (t) => !t.completed,
    "All Tasks": (t) => true
};

// Component that renders the top-level app: some filters, an input, and the todo item hierarchy
export default class TodoList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: new TodoItems(),
            editing: [],
            filter: "Incomplete Tasks"
        };
    }

    getFilter() {
        return Filters[this.state.filter];
    }

    addTodo(todo) {
        this.setState({ todos: this.state.todos.addTodo(todo) });
    }

    toggleTodo(todoToToggle) {
        this.updateTodo(todoToToggle, todoToToggle.toggleCompletion());
    }

    startEditingTodo(todo) {
        this.setState({ editing: this.state.editing.concat(todo.id) });
    }

    stopEditingTodo(todo) {
        this.setState({ editing: this.state.editing.filter((id) => id !== todo.id) });
    }

    updateTodo(originalTodo, updatedTodo) {
        this.setState({ todos: this.state.todos.updateTodo(originalTodo, updatedTodo) });
    }

    indentTodo(todo) {
        this.setState({ todos: this.state.todos.indentTodo(todo, this.getFilter()) });
    }

    unindentTodo(todo) {
        this.setState({ todos: this.state.todos.unindentTodo(todo) });
    }

    render() {
        return (
            <div className="todoList">
                <div className="filters">
                    { Object.keys(Filters).map((filter, i) => (
                        <button key={i}
                                className={ this.state.filter === filter ? "active" : "" }
                                onClick={() => this.setState({filter: filter})}>
                            {filter}
                        </button>
                    ))}
                </div>

                <TodoInput onTodoAdded={this.addTodo.bind(this)} />
                { this.renderTodos(this.state.todos.getChildren(this.getFilter())) }
            </div>
        );
    }

    renderTodos(todos) {
        if (todos.length === 0) return;

        return (
            <ul>
            { todos.map((todo, i) => {
                return (
                    <EditableTodoItem
                            key={todo.id}
                            todo={todo}
                            editing={this.state.editing.includes(todo.id)}

                            onTodoToggled={this.toggleTodo.bind(this, todo)}
                            onTodoUpdated={this.updateTodo.bind(this, todo)}

                            onTodoIndented={this.indentTodo.bind(this, todo)}
                            onTodoUnindented={this.unindentTodo.bind(this, todo)}

                            onStartEditing={this.startEditingTodo.bind(this, todo)}
                            onStopEditing={this.stopEditingTodo.bind(this, todo)}>
                        <CollapsibleBlock>
                            { this.renderTodos(todo.getChildren(this.getFilter())) }
                        </CollapsibleBlock>
                    </EditableTodoItem>
                )
            })}
            </ul>
        );
    }
}
