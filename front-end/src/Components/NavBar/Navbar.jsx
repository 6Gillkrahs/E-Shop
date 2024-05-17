import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContect';
import { useRef } from 'react';

const React = require('react');
require('./Navbar.css');
const logo = require('../Assets/logo.png');
const cart_icon = require('../Assets/cart_icon.png');

const Navbar = ()=>{
    const {getTotalCartItems} = useContext(ShopContext)
    const [menu,setmenu] = React.useState("shop")
    const menuRef = useRef()
    return(
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>Siu SHOP</p>
            </div>
            <ul ref={menuRef} className='nav-menu'> 
                 <li onClick={()=>(setmenu('shop'))}><Link style={{textDecoration:'none' , color:'#626262'}} to='/'>Shop</Link>{menu === 'shop'?<hr/>:<></>}</li>
                 <li onClick={()=>(setmenu('mens'))}><Link style={{textDecoration:'none',color:'#626262'}} to='/mens'>Men</Link>  {menu === 'mens'?<hr/>:<></>}</li>
                 <li onClick={()=>(setmenu('womens'))}><Link style={{textDecoration:'none',color:'#626262'}} to="/womens">Women</Link> {menu === 'womens'?<hr/>:<></>}</li>
                 <li onClick={()=>(setmenu('kids'))}><Link style={{textDecoration:'none',color:'#626262'}} to='/kids'>Kids</Link> {menu === 'kids'?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.reload()}}>Log out</button>: <Link to='/login'> <button>Login</button></Link>}
               <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
               <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}


export default Navbar