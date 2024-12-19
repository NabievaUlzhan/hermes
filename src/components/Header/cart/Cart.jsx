import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getClothesByIdAction } from "../../../store/clothesReducer";
import { removeCart } from "../../../API/CartService";

const Cart = ({item, key, uniqueCartItems, total, setTotal})=>{
  let [count, setCount] = useState(1)
  const dispatch = useDispatch();
  const clothes = useSelector(state =>state.clothesReducer.clothes)
  const cartItems = useSelector(state => state.cartReducer.cart)
  function plusCount(){
    setCount(count+=1)
  }
  function minusCount(){
    if(count <= 0 || count == 1){
      setCount(1)
    }
    else{
      setCount(count-=1)
    }
  }

  let [array, setArray] = useState(uniqueCartItems)

  const countEndPrice = (count, id)=>{
    let counter = 0
    let startPrice = cartItems.find(one=>one.id == id)

    array.map(item=>{
      // item.endPrice = item.price
      if(item.id == id){
        item.endPrice = startPrice.price*count
        counter=counter+1
      }
    })
    if(counter == 0){
      const newItem = {
        id: id,
        endPrice: startPrice.price*count
      }
      setArray(...array, newItem)
    }
  }

  const countTotal = ()=>{
    total = 0
    array.map(item=>{
      setTotal(total+=item.endPrice)
    }) 
    console.log(array)
  }

  function showClothes(id){
    return dispatch(getClothesByIdAction(id))
  }

  const removeItem = (id) => {
    const index = array.findIndex(item=>item.id == id)
    array.splice(index, 1)
    return dispatch(removeCart(id))
  }

  useEffect(() => {
    // countTotal()
    uniqueCartItems.map(item=>{
      setTotal(total+=item.price)
    })
  }, [])


  return(
    <>
      <div key={key} className="cart_card">
        <ul className="cart_card-info">
          <ul>
            <img className="cart_card-poster" src={item.poster[0]} alt="" />
          </ul>
          <ul className="cart-info_text">
            <Link to={'/clothes/' + item.type.toLowerCase() + '/' + item.id}>
              <h3 className="link" onClick={()=>showClothes(item.id)}>{item.name}</h3>
            </Link>
            <p>Color: {item.color}</p>
            <p>Category: {item.type}</p>
          </ul>
        </ul>

        <ul className="cart_card-info">
          <ul className="cart_info-count">
            <h3>{item.for_who}'s</h3>
            <div className="cart_card-counter">
              <div onClick={()=>{
                minusCount()
                countEndPrice(count, item.id)
                countTotal()
              }}>-</div>
              <p>{count}</p>
              <div onClick={()=>{
                plusCount()
                countEndPrice(count, item.id)
                countTotal()
              }}>+</div>
            </div>
          </ul>

          <ul className="cart_card-fourth">
            <p><img 
                  style={{width: 18}}
                  src="https://www.svgrepo.com/show/500351/close.svg" alt="" 
                  onClick={()=>{removeItem(item.id)
                    countTotal()
                  }}
                /></p>
            <p>${item.price*count}</p>
          </ul>
        </ul>
        
      </div>
      <hr className="cart_card-hr" />
    </>
  )
}

export default Cart