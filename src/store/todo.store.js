import { Todo } from "../Todo/models/todo.model";

// el Sotre tiene la funcionalidad de no recurrir al cuerpo html para obtenre la información.
const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed',
}

const state = {
    todos: [
        new Todo('piedra del Tiempo'),
        new Todo('piedra del Espacio'),
        new Todo('piedra de la Realidad'),
        new Todo('piedra del Poder'),
    ],
    filters: Filters.All,
}

// funcion para inicializar el store
const initSotre = () => {
    console.log('InitStore 🍍');
    console.log(state);
}

const loadStore = () => {
    throw new Error('function not implement');
}

/**
 * return array of todos filters.
 * @param {String} filtro
 * @returns new array of todos.
 */
const getTodos = (filtro = Filters.All) => {
    //throw new Error('function not implement');
    switch (filtro) {
        case Filters.All:
            // return [...state.todos];
            return state.todos;
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filtro} is not valid`);
    }
}
/**
 * 
 * @param {String} desciption 
 */
const addTodo = (desciption) => {
    // throw new Error('function not implement');
    if (!desciption)
        throw new Error('Description is requeried');
    state.todos.push(new Todo(desciption));
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    // throw new Error('function not implement');
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    // throw new Error('function not implement');
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = () => {
    // throw new Error('function not implement');
    state.todos = state.todos.filter(todo => !todo.done)
}

const setFilter = (newfilter = Filters.All) => {
    // throw new Error('function not implement');
    state.filters = newfilter;
}

const getCurrentFilter = () => {
    // throw new Error('function not implement');
    return state.filters;
}

export default {
    initSotre,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}