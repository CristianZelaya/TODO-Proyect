import { Todo, TodoList } from './classes'
import { crearTodoHTML } from './js/componentes';

import './css/styles.css'

export const todoList = new TodoList;

todoList.todos.forEach( todo => crearTodoHTML( todo ));

todoList.todos[0].imprimirClase();

console.log(todoList);

/*const todo = new Todo('Aprender JavaScript');
todoList.nuevoTodo(todo);
crearTodoHTML(todo);*/