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

  handleCancelChanges(event) {
    this.setState({ editedContent: this.props.todo.content });
    this.props.onStopEditing();
  }

  handleKeyPress(event) {
    if (event.key === "Escape") {
      this.handleCancel(event);
    }
  }

  handleClick(event) {
    // Ignore bubbled events from anything else
    if (event.target === this.refs.content ||
        event.target === this.refs.liWrapper) {
      this.props.onStartEditing();
    }
  }

  render() {
    var todo = this.props.todo;

    var content = this.props.editing ? (
      <form onSubmit={this.handleSaveChanges.bind(this)}
            onKeyDown={this.handleKeyPress.bind(this)}>
        <input className="content"
               type="text"
               autoFocus
               value={this.state.editedContent}
               onChange={this.handleContentEdited.bind(this)} />

        <button type="submit" onClick={(e) => e.stopPropagation()}>
          <Icon fa="save" />
        </button>

        <button type="button" onClick={this.handleCancelChanges.bind(this)}>
          <Icon fa="undo" />
        </button>

        <button type="button" onClick={this.props.onTodoUnindented}>
          <Icon fa="dedent" />
        </button>

        <button type="button" onClick={this.props.onTodoIndented}>
        <Icon fa="indent" />
        </button>
      </form>
    ) : (
      <div ref="content" className="content">
        {todo.content}
      </div>
    );

    return (
      <li ref="liWrapper"
          className="todo"
          onClick={this.handleClick.bind(this)}>
        <LabelledCheckbox className="completionToggle"
                          value={todo.completed}
                          onChange={this.props.onTodoToggled} />
        { content }
        { this.props.children }
      </li>
    );
  }
}

EditableTodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  editing: React.PropTypes.bool.isRequired,

  onStartEditing: React.PropTypes.func.isRequired,
  onTodoToggled: React.PropTypes.func.isRequired,
  onTodoUpdated: React.PropTypes.func.isRequired,
  onTodoIndented: React.PropTypes.func.isRequired,
  onTodoUnindented: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func.isRequired,

  children: React.PropTypes.node
};
