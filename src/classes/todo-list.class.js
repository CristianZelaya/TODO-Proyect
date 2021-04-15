import { Todo } from "./todo.class";

export class TodoList{

    constructor () {

        //this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ) {

        this.todos.push( todo );
        this.guardarLocalStorage();

    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id); // crea un nuevo arreglo y excluye el id que recibe
        this.guardarLocalStorage();

    }

    marcarCompletado( id ) {

        for (const todo of this.todos){
            if (todo.id == id){

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;

            }
        }

    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){

        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );

    }

    cargarLocalStorage(){
        
        this.todos = ( localStorage.getItem('todo') )
                        ? JSON.parse(localStorage.getItem('todo'))
                        : [];

        this.todos = this.todos.map( obj => Todo.fromJson( obj ) ); // map retorna un nuevo objeto

    }

    totalPendientes(){

        const totalPendientes = this.todos.filter( todo => !todo.completado);

        return totalPendientes.length;

    }

}