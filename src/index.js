import { Todo, TodoList } from './classes'
import { crearTodoHTML } from './js/componentes';

import './styles.css'

export const todoList = new TodoList;

const todo = new Todo('Aprender JavaScript');

todoList.nuevoTodo(todo);

console.log(todoList.todos);

crearTodoHTML(todo);