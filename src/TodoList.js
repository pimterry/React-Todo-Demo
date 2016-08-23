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
      <div>A todo!</div>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <div className="TodoList">
        <TodoInput/>

        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
      </div>
    );
  }
}

export default TodoList;
