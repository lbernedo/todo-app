import TodoStore from '../store/Todo.store';
import html from './app.html?raw';
import { renderTodos } from './uses-cases/render-todos';


/**
 * carga la aplicación
 * @param {String} elementId el id del div principal
 */
const elementsId = {
    todoList : '.todo-list',
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
}