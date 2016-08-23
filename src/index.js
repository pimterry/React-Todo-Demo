import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import './index.css';

var todos = [
  { content: "A todo" },
  { content: "Another todo" },
  { content: "Todo or not todo" },
  { content: "Todon't" }
];

ReactDOM.render(
  <TodoList todos={todos} />,
  document.getElementById('root')
);
