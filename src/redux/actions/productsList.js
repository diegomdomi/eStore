export const ACTIONS_PRODUCTS = {

    PRODUCTS: "PRODUCTS"
}
export const productsList = (products) =>{
    return{
        type: ACTIONS_PRODUCTS.PRODUCTS,
        payload:products
    }
}
