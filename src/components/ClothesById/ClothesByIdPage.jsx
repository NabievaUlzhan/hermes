import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackButton from '../UI/button/BackButton'
import cart from '../../images/cart.svg'
import { addCartItem, getClothesByIdAction, getClothesByTypes, getReviewsByIdAction } from "../../store/clothesReducer";
import { Link } from "react-router-dom";
import ClothesList from '../ClothesLists/ClothesList'
import Reviews from "./Reviews";
import { getReviews, addReview, removeReview } from "../../API/ReviewsService";
import { addCart, getCart } from "../../API/CartService";
import Loader from "../UI/loader/Loader";

const ClothesByIdPage = ()=>{
  const clothesById = useSelector(state =>state.clothesReducer.clothesById)
  // const clothesSearch = useSelector(state =>state.clothesReducer.clothesSearch)
  let [slider, setSlider] = useState(0)
  const dispatch = useDispatch();
  let [isLoading, setIsLoading] = useState(true)
  const reviewsAll = useSelector(state => state.clothesReducer.reviews)
  const cartItems = useSelector(state => state.cartReducer.cart)

  let clothesByType = useSelector(state =>state.clothesReducer.clothesByTypes)
  clothesByType = clothesByType.filter(item=>item.id !== clothesById[0].id)
  clothesByType.length = 4
  
  const nextSlider = (array)=>{
    if(slider < array.length){
      setSlider(slider+1)
    }
    if(slider + 1 >= array.length){
      setSlider(0)
    }
    
  }
  const prevSlider = (array)=>{
    if(slider < array.length){
      setSlider(slider-1)
    }
    if(slider <= 0){
      setSlider(array.length-1)
    }
  }

  const changeSlider = (index)=>{
    setSlider(index)
  }

  const cart1 = useSelector(state => state.clothesReducer.cartItems)

  function addToCart(id, item){
    item.item_id = item.id
    if(!cartItems.includes(cartItems.find(one=>one.item_id == id))){
      setIsVisible(true)
      return dispatch(addCart(item))
    }
  }

  const [isVisible, setIsVisible] = useState(false)

  function hideSidebar(){
    setIsVisible(false)
  }

  function showClothes(id){
    return dispatch(getClothesByIdAction(id))
  }

  function showReviews(){
    return dispatch(getReviews())
  }

  function showReviewsById(){
    return dispatch(getReviewsByIdAction(clothesById[0].id))
  }
  const reviews = useSelector(state => state.clothesReducer.reviewsById)

  // const user = JSON.parse(localStorage.getItem('user'))
  // const addNewReview = (rating, text, id) =>{
  //   const newReview = {
  //     item_id: id,
  //     name: `${user.first_name} ${user.last_name}`,
  //     email: user.email,
  //     rating: rating,
  //     date: new Date(),
  //     text: text
  //   }
  //   if(rating && text){
  //     dispatch(addReview(newReview))
  //   }
  // }

  function getCartItems(){
    return dispatch(getCart())
  }
  
  useEffect(() => {
    showReviews()
    dispatch(getClothesByTypes(clothesById[0].type))
    showReviewsById()
    console.log(reviews)
    if(reviews){
      setIsLoading(false)
    }
    getCartItems()
  }, [dispatch])
  
  
  return(
    <>
    {
      isLoading?
      <Loader />
      :
      <div className="clothes_id">
        <div className="clothes_id-header"><Header /></div>
        <div className="clothes_id-main">
          <BackButton />
          
          <div className="clothes_id-content">
            <div className="clothes_id-posters">
              {
                clothesById[0].poster.map((item, index)=>
                  <img onClick={()=>changeSlider(index)} key={index} src={item} alt="" />
                )
              }
            </div>
            
            <div className="clothes_id-poster">
              <button onClick={()=>prevSlider(clothesById[0].poster)} className="prev">
                <img style={{width: 40, transform: 'rotate(180deg)'}} src="https://www.svgrepo.com/show/449159/next.svg" alt="" />
              </button>
              <img className="clothes_id-picture" src={clothesById[0].poster[slider]} alt="" />
              <button onClick={()=>nextSlider(clothesById[0].poster)} className="next">
                <img style={{width: 40}} src="https://www.svgrepo.com/show/449159/next.svg" alt="" />
              </button>
            </div>

            <div className="clothes_id-text">
              <h3>{clothesById[0].name}</h3>
              <p>$ {clothesById[0].price}</p>
              <hr />
              <div className="clothes_id-color">
                <p>Color</p>
                <p id="color">{clothesById[0].color}</p>
              </div>
              <hr />
              <p>— {clothesById[0].description} <span>(100% {clothesById[0].material})</span></p>
              <hr />
              <p>Made in {clothesById[0].country}</p>
              <button
                className="btn"
                onClick={()=>addToCart(clothesById[0].id, clothesById[0])}>
                <img src={cart} alt="" />
                <span>Add to Cart</span>
              </button>
            </div> 
          </div>  
        </div>

        <div className="clothes_id-explore">
          <h2>Keep exploring</h2>
          <div className="clothes_explore-list">
            {
              clothesByType.map(item=>
                <Link className="explore_list-card" to={'/clothes/' + item.type.toLowerCase() + '/' + item.id} key={item.id}>
                  <img style={{width: '100%'}} src={item.poster[0]} onClick={()=>{showClothes(item.id)
                    showReviewsById()
                  }} alt="" />
                </Link>    
              )
            }
            
          </div>
          
        </div>

        <Reviews reviews={reviews} > </Reviews>
        
        <Footer />
        {isVisible?
          <div className="cart_alert">
            <img 
              className="cart_alert-close" 
              src="https://www.svgrepo.com/show/500351/close.svg" alt=""
              onClick={()=>hideSidebar()} />
            <div className="cart_alert-content">
              <img src="https://www.svgrepo.com/show/263608/shopping-bag-bag.svg" alt="" />
              <p>This item has been added to the cart</p>
              <Link className='' to="/cart">
                <button className="link btn">View Cart</button>
              </Link>
            </div>
          </div>
          :
          <></>
        }
        
      </div>  
    }
    </>
  )
}

export default ClothesByIdPage