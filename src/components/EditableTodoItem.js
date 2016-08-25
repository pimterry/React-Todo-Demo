import React, { Component } from 'react';

import Icon from './Icon';
import LabelledCheckbox from './LabelledCheckbox';

export default class EditableTodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { editedContent: this.props.todo.content };
  }

  handleContentEdited(event) {
    var newContent = event.target.value;
    this.setState({ editedContent: newContent });
  }

  handleSaveChanges(event) {
    event.preventDefault();

    var newTodo = this.props.todo.updateContent(this.state.editedContent);

    this.props.onTodoUpdated(newTodo);
    this.props.onStopEditing();
  }

  handleCancel(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onStopEditing();
  }

  handleKeyPress(event) {
    if (event.key === "Escape") {
      this.handleCancel(event);
    }
  }

  handleIndented(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onTodoIndented();
  }

  handleUnindented(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onTodoUnindented();
  }

  render() {
    var todo = this.props.todo;

    return (
      <li className="todo editable">
        <LabelledCheckbox className="completionToggle"
                          value={todo.completed}
                          onChange={this.props.onTodoToggled} />

        <form onSubmit={this.handleSaveChanges.bind(this)}
              onKeyDown={this.handleKeyPress.bind(this)}>
          <input className="content"
                 type="text"
                 autoFocus
                 value={this.state.editedContent}
                 onChange={this.handleContentEdited.bind(this)} />
          <button onClick={(e) => e.stopPropagation()} type="submit"><Icon fa="save" /></button>
          <button onClick={this.handleCancel.bind(this)}><Icon fa="undo" /></button>

          <button onClick={this.handleUnindented.bind(this)}><Icon fa="dedent" /></button>
          <button onClick={this.handleIndented.bind(this)}><Icon fa="indent" /></button>
        </form>

        { this.props.children }
      </li>
    )
  }
}

EditableTodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onTodoToggled: React.PropTypes.func.isRequired,
  onTodoUpdated: React.PropTypes.func.isRequired,
  onTodoIndented: React.PropTypes.func.isRequired,
  onTodoUnindented: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func.isRequired,
  children: React.PropTypes.node
};
