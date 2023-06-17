import TodoStore from '../store/Todo.store';
import html from './app.html?raw';
import { renderTodos } from './uses-cases/render-todos';


/**
 * carga la aplicación
 * @param {String} elementId el id del div principal
 */
const elementsId = {
    todoList: '.todo-list',
    imputTodo: '#new-todo-input',
    todoFiltro: '.filtro',
    clearCopleted: '.clear-completed',
}
export const App = (elementId) => {

    const displayTodo = () => {
        const todos = TodoStore.getTodos(TodoStore.getCurrentFilter());
        renderTodos(elementsId.todoList, todos);
    }

    // funcion autoinvocada que carga el html.
    (() => {
        const app = document.createElement('div');
        //app.innerHTML = '<h2> hola Mundo</h2>';
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodo();
    })();

    const newImputTodo = document.querySelector(elementsId.imputTodo);
    const todoListUl = document.querySelector(elementsId.todoList);
    const filtroTodos = document.querySelectorAll(elementsId.todoFiltro);
    const buttonCLearCompleted = document.querySelector(elementsId.clearCopleted);

    //Listeners
    //agregar un nuevo todo :
    newImputTodo.addEventListener('keyup', (event) => {
        // console.log(event.target.value);
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;
        TodoStore.addTodo(event.target.value);
        displayTodo();
        event.target.value = '';
    });

    //seleccionar cambiar estado de un todo :
    todoListUl.addEventListener('click', (event) => {
        //closest es una propiedad de los elementosHTML que devuelve
        //un elemento html mas cercano de acuerdo al css selector que recibe como parametro.
        //console.log(event.target.closest('[data-id]'));
        const element = event.target.closest('[data-id]');
        const todoId = element.getAttribute('data-id');
        TodoStore.toggleTodo(todoId);
        displayTodo();
    });

    //elimiar el todo :
    todoListUl.addEventListener('click', (event) => {
        //evaluar si el elemento seleccionado tiene la clase destroy.
        const isDestroyElement = event.target.className === 'destroy';
        //obtener el elemento mas cercano que tenga la propiedad data-id
        const element = event.target.closest('[data-id]');
        //evaluar clase del elemento no es destroy o el elemento no existe.
        if (!isDestroyElement || !element) return;
        //obtener el valor del id del Todo.
        const todoId = element.getAttribute('data-id');
        //eliminar el Todo.
        TodoStore.deleteTodo(todoId);
        //desplegar el todo.
        displayTodo();
    });

    //se elimina los todos que esten completados.
    buttonCLearCompleted.addEventListener('click', (event) => {
        TodoStore.deleteCompleted();
        displayTodo();
    });
}