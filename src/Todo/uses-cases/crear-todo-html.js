import { Todo } from "../models/todo.model";

/**
 * crea un elemento todo en HTML.
 * @param {Todo} todo 
 */
export const crearTodoHTML = (todo) => {
    if (!todo) throw new Error('A TODO es requiered');

    const { id, done, description } = todo;
    const html = `<div class="view">
                    <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
                    <label>${description}</label>
                    <button class="destroy"></button>
                  </div>
                <input class="edit" value="Create a TodoMVC template">`;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    if (todo.done)
        liElement.classList.add('completed');
    return liElement;
}