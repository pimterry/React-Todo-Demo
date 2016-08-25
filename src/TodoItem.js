import React, { Component } from 'react';

import LabelledCheckbox from './LabelledCheckbox';

export default class TodoItem extends Component {
  handleToggled(event) {
    event.stopPropagation();
    this.props.onTodoToggled();
  }

  handleClick(event) {
    event.stopPropagation();
    this.props.onClick();
  }

  render() {
    var todo = this.props.todo;

    return (
      <li onClick={this.handleClick.bind(this)}>
        <LabelledCheckbox className="completionToggle"
                          value={todo.completed}
                          onChange={this.props.onTodoToggled} />
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
