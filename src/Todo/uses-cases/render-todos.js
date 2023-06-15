import { Todo } from "../models/todo.model";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    if(!element)
        element = document.querySelector(elementId);
    if(!element) throw new Error(`Element ${elementId} not found`);

    element.innerHTML = '';
    todos.array.forEach(todo => {
        element.append();
    });
}