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
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!isDestroyElement || !element) return;
        const todoId = element.getAttribute('data-id');
        TodoStore.deleteTodo(todoId);
        displayTodo();
    });

}