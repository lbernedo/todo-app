//uuid libreria que permite poder generar cadea de unica de id de forma aleatoria
import { v4 as uuid } from 'uuid';

export class Todo {

    /**
     * 
     * @param {string} description 
     */
    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createAt = new Date();
    }

}