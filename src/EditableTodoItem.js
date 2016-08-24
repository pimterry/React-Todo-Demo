import React, { Component } from 'react';

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
    this.props.onStopEditing();
  }

  handleKeyPress(event) {
    if (event.key === "Escape") {
      this.handleCancel(event);
    }
  }

  handleIndented(event) {
    event.stopPropagation();
    this.props.onTodoIndented();
  }

  handleUnindented(event) {
    event.stopPropagation();
    this.props.onTodoUnindented();
  }

  render() {
    var todo = this.props.todo;

    return (
      <li>
        <input type="checkbox" value={todo.completed} onChange={this.props.onTodoToggled} />

        <form onSubmit={this.handleSaveChanges.bind(this)}
              onKeyDown={this.handleKeyPress.bind(this)}>
          <input className="content"
                 type="text"
                 autoFocus
                 value={this.state.editedContent}
                 onChange={this.handleContentEdited.bind(this)} />
          <input type="submit" value="Save changes" />
          <input type="button" value="Cancel" onClick={this.handleCancel.bind(this)} />

          <input type="button" value="Make subtask" onClick={this.handleIndented.bind(this)} />
          <input type="button" value="Unmake subtask" onClick={this.handleUnindented.bind(this)} />
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
