import React, { Component } from 'react';

import { TodoItems } from './TodoModel';

import CollapsibleBlock from './CollapsibleBlock';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import EditableTodoItem from './EditableTodoItem';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todos: new TodoItems(), editing: [] };
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
    this.setState({ todos: this.state.todos.indentTodo(todo) });
  }

  unindentTodo(todo) {
    this.setState({ todos: this.state.todos.unindentTodo(todo) });
  }

  render() {
    return (
      <div className="todoList">
        <TodoInput onTodoAdded={this.addTodo.bind(this)} />
        { this.renderTodos(this.state.todos.getChildren((t) => !t.completed)) }
      </div>
    );
  }

  renderTodos(todos) {
    if (todos.length === 0) return;

    return (
      <ul>
      { todos.map((todo, i) => {
        var subtasks = todo.getChildren((t) => !t.completed);
        var subtaskHtml = subtasks.length > 0 ? (
            <CollapsibleBlock>
              { this.renderTodos(subtasks) }
            </CollapsibleBlock>
        ) : null;

        return this.state.editing.includes(todo.id) ? (
          <EditableTodoItem
                    key={todo.id}
                    todo={todo}
                    onTodoToggled={this.toggleTodo.bind(this, todo)}
                    onTodoUpdated={this.updateTodo.bind(this, todo)}
                    onTodoIndented={this.indentTodo.bind(this, todo)}
                    onTodoUnindented={this.unindentTodo.bind(this, todo)}
                    onStopEditing={this.stopEditingTodo.bind(this, todo)}>
            { subtaskHtml }
          </EditableTodoItem>
        ) : (
          <TodoItem key={todo.id}
                    todo={todo}
                    onTodoToggled={this.toggleTodo.bind(this, todo)}
                    onClick={this.startEditingTodo.bind(this, todo)}>
            { subtaskHtml }
          </TodoItem>
        )
      })}
      </ul>
    );
  }
}
