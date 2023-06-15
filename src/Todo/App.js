import TodoStore from '../store/Todo.store';
import html from './app.html?raw';


/**
 * carga la aplicación
 * @param {String} elementId el id del div principal
 */
export const App = (elementId) => {

    // funcion autoinvocada que carga el html.
    (() => {
        const app = document.createElement('div');
        //app.innerHTML = '<h2> hola Mundo</h2>';
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();

    const displayTodo = () => {
        const todos = TodoStore.getTodos(TodoStore.getCurrentFilter());

    }
}