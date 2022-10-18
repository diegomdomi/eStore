import React, {useState} from 'react'
import './store.css'
import Product from './Product'
import ModalFunc from './ModalFunc'

const Store = ({products}) => {

const [modal,setModal] = useState(false)

const changeState = () => {
  setModal(!modal)
}


  return (
   <>

    <div className="container">
      <div className="row">
       {products.map((item, index) => {
          return( <Product  title={item.title}
                            price= {item.price}       
                            description={item.description}
                            rating={item.rating.rate}
                            img={item.image}
                            category={item.category}
                            id={item.id}
                            key={index}/>
             )
        })}
      </div>
    </div> 
    
    <ModalFunc changeState={changeState}/>
    </>

  )
}


export default Store





