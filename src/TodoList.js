import React, { Component } from 'react';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todos: [] };
  }

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.concat(todo)
    });
  }

  updateTodo(originalTodo, updatedTodo) {
    this.setState({
      todos: this.state.todos.map((todo) => todo === originalTodo ? updatedTodo : todo)
    });
  }

  toggleTodo(todoToToggle) {
    this.setState({
      todos: this.state.todos.map((todo) => todo === todoToToggle ? todo.toggleCompletion() : todo)
    });
  }

  render() {
    var incompleteTodos = this.state.todos.filter((todo) => !todo.completed);

    return (
      <div className="todoList">
        <TodoInput onTodoAdded={this.addTodo.bind(this)} />

        <ul>
        {incompleteTodos.map((todo, i) => (
          <TodoItem key={i}
                    todo={todo}
                    onTodoToggled={this.toggleTodo.bind(this, todo)}
                    onTodoUpdated={this.updateTodo.bind(this, todo)} />
        ))}
        </ul>
      </div>
    );
  }
}
