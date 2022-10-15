
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import products  from './reducers/productsReducer'
import {rootSaga} from './sagas/index'



const rootReducers = combineReducers({
  products:products
})

export const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  
  let miStore = createStore( 
    rootReducers, 
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
      );
      sagaMiddleware.run(rootSaga);
    return miStore;
  }
    
 
export default createAppStore;

