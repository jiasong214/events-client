import { applyMiddleware, createStore } from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';

// const config = () => {
//   const store = createStore(modules, applyMiddleware(thunk));
//   return store;
// }

const store = createStore(modules, applyMiddleware(thunk));

export default store;