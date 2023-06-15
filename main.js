import './style.css';
import { App } from './src/Todo/App';
import TodoStore from './src/store/Todo.store';

TodoStore.initSotre();

App('#app');