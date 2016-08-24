import React, { Component } from 'react';

export default class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { editable: false, editedContent: this.props.todo.content };
  }

  handleClick(event) {
    event.stopPropagation();
    this.setState(Object.assign({}, this.state,
      { editable: true }));
  }

  handleContentEdited(event) {
    var newContent = event.target.value;

    this.setState(Object.assign({}, this.state,
      { editedContent: newContent }));
  }

  handleSaveChanges(event) {
    event.preventDefault();

    var newTodo = this.props.todo.updateContent(this.state.editedContent);
    this.props.onTodoUpdated(newTodo);

    this.setState(Object.assign({}, this.state,
      { editable: false }));
  }

  handleCancel(event) {
    event.stopPropagation();
    this.setState(Object.assign({}, this.state,
      { editable: false, editedContent: this.props.todo.content }));
  }

  handleKeyPress(event) {
    if (event.key === "Escape") {
      this.handleCancel(event);
    }
  }

  render() {
    var todo = this.props.todo;
    return (
      <li onClick={this.handleClick.bind(this)}>
        <input type="checkbox" value={todo.completed} onChange={this.props.onTodoToggled} />
        { this.state.editable ? (
          <form onSubmit={this.handleSaveChanges.bind(this)}
                onKeyDown={this.handleKeyPress.bind(this)}>
            <input className="content"
                   type="text"
                   autoFocus
                   value={this.state.editedContent}
                   onChange={this.handleContentEdited.bind(this)} />
            <input type="submit" value="Save changes" />
            <input type="button" value="Cancel" onClick={this.handleCancel.bind(this)} />

            <input type="button" value="Make subtask" onClick={this.props.onTodoIndented} />
            <input type="button" value="Unmake subtask" onClick={this.props.onTodoUnindented} />
          </form>
        ) : (
          <div className="content">
            {todo.content}
          </div>
        )}
        { this.props.children }
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onTodoToggled: React.PropTypes.func.isRequired,
  onTodoUpdated: React.PropTypes.func.isRequired,
  onTodoIndented: React.PropTypes.func.isRequired,
  onTodoUnindented: React.PropTypes.func.isRequired,
  children: React.PropTypes.node
};
