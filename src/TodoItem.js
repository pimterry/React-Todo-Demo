import React, { Component } from 'react';

export default class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { editable: false, editedContent: this.props.todo.content };
  }

  handleClick(event) {
    this.setState(Object.assign({}, this.state, { editable: true }));
  }

  handleContentEdited(event) {
    var newContent = event.target.value;
    this.setState(Object.assign({}, this.state, { editedContent: newContent }));
  }

  handleSaveChanges(event) {
    event.preventDefault();

    var newTodo = this.props.todo.updateContent(this.state.editedContent);
    this.props.onTodoUpdated(newTodo);

    this.setState(Object.assign({}, this.state, { editable: false }));
  }

  render() {
    var todo = this.props.todo;
    return (
      <li onClick={this.handleClick.bind(this)}>
        <input type="checkbox" value={todo.completed} onChange={this.props.onTodoToggled} />
        { this.state.editable ? (
          <form onSubmit={this.handleSaveChanges.bind(this)}>
            <input className="content"
                   type="text"
                   value={this.state.editedContent}
                   onChange={this.handleContentEdited.bind(this)} />
            <input type="submit" value="Save changes" />
          </form>
        ) : (
          <div className="content">
            {todo.content}
          </div>
        )}
      </li>
    )
  }
}
