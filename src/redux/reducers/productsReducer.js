import {ACTIONS_PRODUCTS} from "../actions/productsList"
import {LOAD_PRODUCTS} from '../actions/productsActions'


const initialState = {
    products: [],
}
const products = (state= initialState.products,action) => {
    switch(action.type){
        case LOAD_PRODUCTS:
            return[...state];       
            case ACTIONS_PRODUCTS.PRODUCTS:
           state.push(action.products);
            return[...state];
            default:
                 return [...state];
    }
}
export default products
