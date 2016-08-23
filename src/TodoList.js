import React, { Component } from 'react';
import './TodoList.css';

class TodoInput extends Component {
  render() {
    return (
      <div>Enter your TODO here</div>
    )
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li>{this.props.content}</li>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <div className="TodoList">
        <TodoInput/>

        <ul>
        {this.props.todos.map((todo, i) => (
          <TodoItem content={todo.content} key={i} />
        ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
