import html from './app.html?raw';


/**
 * carga la aplicación
 * @param {String} elementId el id del div principal
 */
export const App = (elementId) => {


    // funcion autoinvocada que carga el html.
    (() => {
        const app = document.getElementById(elementId);
        // app.innerHTML = '<h2> hola Mundo</h2>';
        app.innerHTML = html;
        console.log('hola mundo');
    })();
}