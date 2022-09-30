
import { takeLatest, put,call,fork } from 'redux-saga/effects'
import {LOAD_PRODUCTS} from '../actions/productsActions'
import axios from 'axios'
import {ACTIONS_PRODUCTS} from '../actions/productsList'


export function* rootSaga() {
    yield fork(productSaga);
}

export function* productSaga() {
    yield takeLatest(LOAD_PRODUCTS, loadProducts)
}

function* loadProducts() {
    try{
        const products = yield call(getProducts);
        yield put({type:ACTIONS_PRODUCTS.PRODUCTS,products})

    }catch (error) {
        console.log(error);
    }

}
export const getProducts = async () =>{
    return await axios.get("https://fakestoreapi.com/products")
    .then(response => response.data);
}

  


