//permite crear y modificar el contador html
import TodoStore, { Filters } from "../../store/Todo.store";

let element;
/**
 * 
 * @param {string} elementId 
 */
export const renderPeding = (elementId) => {

    if (!element)
        element = document.querySelector(elementId);
    if (!element)
        throw new Error(`Element ${elementId} not found`);

    element.innerHTML = TodoStore.getTodos(Filters.Pending).length;
}