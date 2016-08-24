import React, { Component } from 'react';

export default class TodoItem extends Component {
  handleToggled(event) {
    event.stopPropagation();
    this.props.onTodoToggled();
  }

  render() {
    var todo = this.props.todo;

    return (
      <li onClick={this.props.onClick}>
        <input type="checkbox"
               value={todo.completed}
               onChange={this.props.onTodoToggled}
               onClick={(e) => e.stopPropagation()} />
        <div className="content">
          {todo.content}
        </div>

        { this.props.children }
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onTodoToggled: React.PropTypes.func.isRequired,

  children: React.PropTypes.node
};
