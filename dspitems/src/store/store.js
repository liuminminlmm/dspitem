import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
//引用saga
import sagas from './saga.js';
import createSagaMiddleware from 'redux-saga';
//创建saga
let sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer,applyMiddleware(logger),applyMiddleware(sagaMiddleware));
//监听saga
sagaMiddleware.run(sagas);
export default store;
