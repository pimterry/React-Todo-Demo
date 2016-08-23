import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    return (
      <li>
        <input type="checkbox" value={this.props.completed} onChange={this.props.onTodoToggled} />
        <div className="content">{this.props.content}</div>
      </li>
    )
  }
}
