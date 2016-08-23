import React, { Component } from 'react';

export default class TodoInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { content: '' };
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.content) return;

    this.props.onTodoAdded(this.state);
    this.setState({ content: '' });
  }

  render() {
    return (
      <div className="todoInput">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text"
                 placeholder="What do you want to do?"
                 value={this.state.content}
                 onChange={this.handleContentChange.bind(this)} />
          <input type="submit"
                 value="Add Task" />
        </form>
      </div>
    )
  }
}
