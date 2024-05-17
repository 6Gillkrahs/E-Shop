import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {
  const [image,setImage] = useState(false);
  const imageHandler = (e)=>{
      setImage(e.target.files[0])
  }
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    old_price:"",
    new_price:""
  })
  const add_product =  async ()=>{
    console.log(productDetails)
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData
    }).then((resp)=>resp.json()).then((data)=>{responseData = data});
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product)
      await fetch('http://localhost:4000/addproduct',{
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert('Product Added'):alert('Failed')
      })
    }
  }

  const changeHandler = (e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }



  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" id="" placeholder='Type here' />
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" id="" placeholder='Type here' />
        </div>
      </div>
        <div className='addproduct-itemfield'>
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='addproduct-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
              <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumnail-img' />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{add_product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct
