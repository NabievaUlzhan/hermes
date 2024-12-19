import React, {useState, useEffect} from "react";
import BackButton from '../../UI/button/BackButton'
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { getCart } from "../../../API/CartService";

const CartPage = () => {
  const cartArray = useSelector(state => state.clothesReducer.cartItems)
  const cartItems = useSelector(state => state.cartReducer.cart)
  const dispatch = useDispatch()

  // const findUniqueCartItems = (cartItems) => {
  //   const uniqueItems = new Set();
    
  //   return cartItems.reduce((arr, item) => {
  //     if (!uniqueItems.has(item.item_id)) {
  //       uniqueItems.add(item.item_id);
  //       arr.push(item);
  //     }
  //     return arr;
  //   }, []);
  // };
  
  // const uniqueCartItems = findUniqueCartItems(cartArray)

  function getCartItems(){
    return dispatch(getCart())
  }

  // let uniqueCartItems = []

  // function getUniqueCartItems(){
  //   return uniqueCartItems = findUniqueCartItems(cartItems)
  // }

  // if (localStorage.getItem('auth') == 'true' && uniqueCartItems.length){
  //   localStorage.setItem('cartArray', JSON.stringify(uniqueCartItems))
  // }
  // if(uniqueCartItems.length){
  //   localStorage.setItem('cartArray', JSON.stringify(uniqueCartItems))

  // }
  
  // const cartArray = JSON.parse(localStorage.getItem('cartArray'))
  // console.log(cartArray)

  let [total, setTotal] = useState(0)

  // cartCount = uniqueCartItems
  useEffect(() => {
    getCartItems()
    
  }, []);

  // getUniqueCartItems()

  return(
    <div className="cartpage overflow">
      <div className="cartpage_header">
        <Link className='cartpage_header-logo' to="/">
          <img className="logo " src="https://logodix.com/logo/830925.png" alt="" />
        </Link>
      </div>

      <div className="cartpage_back">
        <BackButton></BackButton>
      </div>
      

      <div className="cartpage_content">
      {
        !cartItems.length?
          <div className="cartpage_content-empty">
            <div className="cartpage_empty-text">
              <img src="https://www.svgrepo.com/show/97420/shopping-bag.svg" style={{width: 50}} />
              <h3>Cart is empty</h3>
            </div>

          </div>
          
        :
          <>
            <h3 className="cartpage_content-title">You have {cartItems.length} item{cartItems.length>1?'s':''} in your cart.</h3>
            <hr className="cart_card-hr"/>
            {
            // cartArray.length?
            cartItems.map((item, index)=>{
              return(
                <Cart item={item} key={index} uniqueCartItems={cartItems} total={total} setTotal={setTotal}></Cart>
              )
            })
            }
            <div className="cartpage_content-total">
              <h3 className="cartpage_content-title">Total</h3>
              <p>${total}</p>
            </div>
          </>
          
      }  
      </div>
    </div>
  )
}

export default CartPage