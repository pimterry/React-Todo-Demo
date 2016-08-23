import React, { Component } from 'react';
import './TodoList.css';

class TodoInput extends Component {
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

class TodoItem extends Component {
  render() {
    return (
      <li>{this.props.content}</li>
    )
  }
}

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { todos: [] };
  }

  addTodo(todo) {
    var todos = this.state.todos.concat(todo);
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div className="todoList">
        <TodoInput onTodoAdded={this.addTodo.bind(this)} />

        <ul>
        {this.state.todos.map((todo, i) => (
          <TodoItem content={todo.content} key={i} />
        ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
