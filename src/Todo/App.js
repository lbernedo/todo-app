import TodoStore, { Filters } from '../store/Todo.store';
import html from './app.html?raw';
import { renderTodos, renderPeding } from './uses-cases/';


/**
 * carga la aplicación
 * @param {String} elementId el id del div principal
 */
const elementsId = {
    todoList: '.todo-list',
    imputTodo: '#new-todo-input',
    todoFiltro: '.filtro',
    clearCopleted: '.clear-completed',
    pedingCount: '#pending-count',
}
export const App = (elementId) => {

    const displayTodo = () => {
        const todos = TodoStore.getTodos(TodoStore.getCurrentFilter());
        renderTodos(elementsId.todoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPeding(elementsId.pedingCount);
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

    //recoremos todos los botones que coincide con la clase filtro.
    filtroTodos.forEach(element => {
        //por cada elemento creamos el listener del boton click
        element.addEventListener('click', (event) => {
            //por cada filtro que recorremos borramos la clase selected
            filtroTodos.forEach(el => el.classList.remove('selected'));
            //agregamos las clase al que está en el evento click
            element.classList.add('selected');
            //de acuerdo al tipo de texto del select realizar el tipo de listado.
            switch (event.target.text) {
                case 'Todos':
                    TodoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    TodoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    TodoStore.setFilter(Filters.Completed);
            }
            displayTodo();
        });
    });
}