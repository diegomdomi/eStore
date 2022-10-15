import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Store from './Store'
import Preloader from './Preloader'
import {loadProducts} from '../../redux/actions/productsActions.js'


const AxiosProducts = () => {
  
  const products = useSelector(state => state.products)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadProducts());
},[])


  return (

  <>
    { 
      products.length === 0 ? <Preloader/> :
      <Store products={products[0]} ></Store>
    }
  </> 
  )
}


export default AxiosProducts

