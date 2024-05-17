import React, { createContext, useEffect, useState } from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart ={};
    for (let i = 0; i < all_product.length+1; i++) {
        cart[i] =0;
    }
    return cart;
}


const ShopContextProvider = (props) =>{
    const [all_product,setAll_Product] = useState([])
    const [cartitem,setCartitems] = useState(getDefaultCart())
    useEffect( ()=>{
        fetch('http://localhost:4000/listproduct')
        .then((resp)=>resp.json())
        .then((data)=>{
            setAll_Product(data)
        })
        if(localStorage.getItem('auth-token')){
            fetch('http:/localhost:4000/getcart',{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            })
            .then((resp)=>resp.json())
            .then((data)=>setCartitems(data))
        }
    },[])

    const addToCart =(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemID":itemId})
            }).then((resp)=>resp.json()).then((data)=>{console.log(data)})
        }
    }

    const removeFromCart =(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartitem){
            if(cartitem[item] > 0){
                let itemInfo = all_product.find((product)=> product.id === Number(item))
                totalAmount += itemInfo.new_price* cartitem[item];
            }
            
        }
        return totalAmount;

    }

    const getTotalCartItems = ()=>{
        let total = 0;
        for(const item in cartitem){
           if(cartitem[item] > 0){
            total += cartitem[item];
           }
        }
        return total;
    }
    const contextValue ={all_product,cartitem,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
            
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;