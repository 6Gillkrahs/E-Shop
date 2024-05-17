import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts,setAllProduct] = useState([]);
  const fetchInfo =async()=>{
      await fetch('http://localhost:4000/listproduct')
      .then((res)=>res.json())
      .then((data) => {setAllProduct(data)})
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  
  const remove_product = async (id)=>{
      await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})

      })
      fetchInfo();
  }

  return (
    <div className='listproduct'> 
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old_Price</p>
        <p>New_Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
          {allproducts.map((item,i)=>{
              return <>
               <div key={i} className='listproduct-format-main listproduct-format'>
                  <img src={item.image} alt="" className='listproduct-product-image'/>
                  <p>{item.name} </p>
                  <p>{item.old_price}</p>
                  <p>{item.new_price}</p>
                  <p>{item.category}</p>
                  <img onClick={()=>{remove_product(item.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
              </div>
              <hr />
              </>
          })}
      </div>
    </div>
  )
}

export default ListProduct
