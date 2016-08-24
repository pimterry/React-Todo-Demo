import React, { Component } from 'react';

import { TodoItems } from './TodoModel';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todos: new TodoItems() };
  }

  addTodo(todo) {
    this.setState({ todos: this.state.todos.addTodo(todo) });
  }

  updateTodo(originalTodo, updatedTodo) {
    this.setState({ todos: this.state.todos.updateTodo(originalTodo, updatedTodo) });
  }

  toggleTodo(todoToToggle) {
    this.updateTodo(todoToToggle, todoToToggle.toggleCompletion());
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
        { this.renderTodos(this.state.todos.children) }
      </div>
    );
  }

  renderTodos(todos) {
    if (todos.length === 0) return;

    return (
      <ul>
      { todos.map((todo, i) => (
        <TodoItem key={i}
                  todo={todo}
                  onTodoToggled={this.toggleTodo.bind(this, todo)}
                  onTodoUpdated={this.updateTodo.bind(this, todo)}
                  onTodoIndented={this.indentTodo.bind(this, todo)}
                  onTodoUnindented={this.unindentTodo.bind(this, todo)}>
          { this.renderTodos(todo.children) }
        </TodoItem>
      ))}
      </ul>
    );
  }
}
