import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContect'
import Item from '../Item/Item'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product,cartitem,removeFromCart,getTotalCartAmount} = useContext(ShopContext) 
    console.log(cartitem)
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
        {all_product.map((item)=>{
            if(cartitem[item.id] > 0){
                return  <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img className='carticon-product-icon' src={item.image} alt="" />
                        <p>{item.name} </p>
                        <p>${item.new_price}</p>
                        <button className='cartitems-quantity'>{cartitem[item.id]}</button>
                        <p>${item.new_price * cartitem[item.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(item.id)}} alt="" />
                    </div>
                </div>
                
            }
            return null;
        })}
        <div className='cartitems-down'>
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtatal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />  
                    <div className="cartitems-total-item total">
                        <p>Total</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code,Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems
