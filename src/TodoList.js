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
    var todos = this.state.todos.concat(todo);
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div className="todoList">
        <TodoInput onTodoAdded={this.addTodo.bind(this)} />

        <ul>
        {this.state.todos.map((todo, i) => (
          <TodoItem content={todo.content} key={i} />
        ))}
        </ul>
      </div>
    );
  }
}
