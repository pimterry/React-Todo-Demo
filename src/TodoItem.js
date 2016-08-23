import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    var todo = this.props.todo;
    return (
      <li>
        <input type="checkbox" value={todo.completed} onChange={this.props.onTodoToggled} />
        <div className="content">{todo.content}</div>
      </li>
    )
  }
}
