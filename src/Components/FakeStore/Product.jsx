import React from 'react'
import { Link } from 'react-router-dom'
import './store.css'
const Product = ({id,title,price,description,rating,img,index,category}) => {


  let abrirProducto = (id,img,title,description,price,category) => {
 
    return {
      pathname: '/product/'+ id,
      state: { 
          id,
          img,
          description,
          title,
          price,
          category
      }
    }  
  }

  

  return (
    <>

    <div className= "col s12 m6 l3" key={index}>
        <div className="card" >
          <div className="card medium">
            <Link to={()=>abrirProducto(id,img,title,description,price,category)} >
              <div className="card-image"  >
              <img src={img} alt={description} id={id} />
              </div>
            </Link>
            <div className="card-content" >
              <span className="card-title">{title}</span>
              <p>u$s {price}</p>
              <p>rating {rating}</p>
            </div>
          </div>
        </div>
      </div>

</>
  )
}

export default React.memo(Product);
// export default Product;