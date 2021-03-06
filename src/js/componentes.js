import { Todo } from "../classes";
import {todoList} from "../index";

const divTodoList   = document.querySelector('.todo-list'),
      txtImput      = document.querySelector('.new-todo'),
      btnBorrarComp = document.querySelector('.clear-completed'),
      ulFiltro      = document.querySelector('.filters'),
      aFiltro       = document.querySelectorAll('.filtro'),
      pendientes    = document.querySelector('strong');

export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado ? 'checked' : '')}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild);

    return div;
}

// Eventos

txtImput.addEventListener('keyup', ( event ) => {


    if ( event.keyCode === 13 && txtImput.value.length > 0 ){

        const nuevoTodo = new Todo(txtImput.value);

        todoList.nuevoTodo(nuevoTodo);

        crearTodoHTML(nuevoTodo);
        
        pendientes.innerText = todoList.totalPendientes();
        txtImput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; // obtiene un input, label, button
    const todoElemento   = event.target.parentElement.parentElement; 
    const todoId         = todoElemento.getAttribute('data-id'); // obtiene el id

    if ( nombreElemento.includes('input')){// click en imput check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        pendientes.innerText = todoList.totalPendientes();

    } else if ( nombreElemento.includes('button')){ // borra el todo

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
        pendientes.innerText = todoList.totalPendientes();
    }

    
});

btnBorrarComp.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length-1; i >= 0; i--){

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltro.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if ( !filtro ){
        return;
    }

    aFiltro.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if ( completado ) {

                    elemento.classList.add('hidden');
                    
                }
            break;
            
            case 'Completados':
                if ( !completado ) {
                    
                    elemento.classList.add('hidden');
                    
                }
            break;
        }
    }
    
});