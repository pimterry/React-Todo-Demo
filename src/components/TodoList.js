import React, { Component } from 'react';

import TodoItems from '../models/TodoItems';

import CollapsibleBlock from './CollapsibleBlock';
import TodoInput from './TodoInput';
import EditableTodoItem from './EditableTodoItem';

export default class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todos: new TodoItems(), editing: [] };
  }

  addTodo(todo) {
    this.setState({ todos: this.state.todos.addTodo(todo) });
  }

  toggleTodo(todoToToggle) {
    this.updateTodo(todoToToggle, todoToToggle.toggleCompletion());
  }

  startEditingTodo(todo) {
    this.setState({ editing: this.state.editing.concat(todo.id) });
  }

  stopEditingTodo(todo) {
    this.setState({ editing: this.state.editing.filter((id) => id !== todo.id) });
  }

  updateTodo(originalTodo, updatedTodo) {
    this.setState({ todos: this.state.todos.updateTodo(originalTodo, updatedTodo) });
  }

  indentTodo(todo) {
    this.setState({ todos: this.state.todos.indentTodo(todo) });
  }

  unindentTodo(todo) {
    this.setState({ todos: this.state.todos.unindentTodo(todo) });
  }

  render() {
    return (
      <div className="todoList">
        <TodoInput onTodoAdded={this.addTodo.bind(this)} />
        { this.renderTodos(this.state.todos.getChildren((t) => !t.completed)) }
      </div>
    );
  }

  renderTodos(todos) {
    if (todos.length === 0) return;

    return (
      <ul>
      { todos.map((todo, i) => {
        return (
          <EditableTodoItem
                    key={todo.id}
                    todo={todo}
                    editing={this.state.editing.includes(todo.id)}

                    onTodoToggled={this.toggleTodo.bind(this, todo)}
                    onTodoUpdated={this.updateTodo.bind(this, todo)}

                    onTodoIndented={this.indentTodo.bind(this, todo)}
                    onTodoUnindented={this.unindentTodo.bind(this, todo)}

                    onStartEditing={this.startEditingTodo.bind(this, todo)}
                    onStopEditing={this.stopEditingTodo.bind(this, todo)}>
            <CollapsibleBlock>
              { this.renderTodos(todo.getChildren((t) => !t.completed)) }
            </CollapsibleBlock>
          </EditableTodoItem>
        )
      })}
      </ul>
    );
  }
}
