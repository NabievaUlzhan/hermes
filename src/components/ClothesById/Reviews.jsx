import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReviewsItem from "./ReviewsItem";
import { getReviews, addReview, removeReview } from "../../API/ReviewsService";
import { filterReviewsAction } from '../../store/clothesReducer'

const Reviews = ({reviews  }) => {
  let [commonRating, setCommonRating] = useState(0)
  let [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const filteredReviews = useSelector(state => state.clothesReducer.filteredReviews)

  function calcRating(){
    commonRating = 0
    reviews.map(item=>{
      setCommonRating(commonRating+=item.rating)
    })
    setCommonRating(Math.round((commonRating/reviews.length) * 2) / 2)
    // return commonRating
  }

  let ratingStars = [];
  let reviewStars = []

  let [rating, setRating] = useState(0)
  let [text, setText] = useState('')
    
  for (let i = 1; i <= 5; i++) {
    if (i <= commonRating) {
      ratingStars.push(<img key={i} className="star" src="https://www.svgrepo.com/show/473405/star-filled.svg" />);
    } 
    else if(i - commonRating < 1){
      ratingStars.push(<img key={i} className="star" src="https://www.svgrepo.com/show/473410/star-half-stroke-filled.svg" />);
    }
    else{ 
      ratingStars.push(<img key={i}  className="star" src="https://www.svgrepo.com/show/473404/star.svg" />);
    }
    reviewStars.push(<img key={i} value={rating} onClick={()=>{setRating(i)
      console.log(rating)
    }} className="star" src="https://www.svgrepo.com/show/473404/star.svg" />)
  }

  const [itemId, setItemId] = useState(0)
  const handleOpen = () => {
    if(localStorage.getItem('auth') == 'true'){
      setIsOpen(!isOpen)
    }
    else{
      navigate('/account')
    }
  }

  // let [isRemoveable, setIsRemoveable] = useState(false)

  // const user = JSON.parse(localStorage.getItem('user'))
  // const checkRemoveable = (email) => {
  //   if(user.email === email){
  //     setIsRemoveable(true)
  //   }
  // }

  useEffect(() => {
    calcRating() 
    // calcStars()
    reviews.map(item=>setItemId(item.item_id))
  }, [])

  function removeReviewById(id) {
    dispatch(removeReview(id))
    calcRating()
  }

  let [isFiltered, setIsFiltered] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  function filterReviews(value){
    dispatch(filterReviewsAction(value))
    setFilterValue(value)
    // console.log(filteredReviews)
    if(filteredReviews.length == 0){
      setIsFiltered(false)
    }
    else{
      setIsFiltered(true)
    }
  }

  const user = JSON.parse(localStorage.getItem('user'))

  const addNewReview = (rating, text, id) =>{
    const newReview = {
      item_id: id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      rating: rating,
      date: new Date(),
      text: text
    }
    if(rating && text){
      dispatch(addReview(newReview))
    }
    calcRating()
  }
  
  return(
    <>
    {
      reviews.length?
        <div className="reviews_container">
          <div className="reviews_container-top">
            <div className="reviews_top-title">
              <h2>Costumer reviews | ({reviews.length})</h2>
              <p>
                {ratingStars}
                {/* <img src="https://www.svgrepo.com/show/452106/star.svg" className="star" /> */}
                {commonRating} out of 5
              </p>
            </div>  
            <div className="reviews_top-filter">
              <button className="reviews_btn btn" onClick={()=>filterReviews('all')}>All</button>
              <button className="reviews_btn btn" onClick={()=>filterReviews('positive')}>Positive</button>
              <button className="reviews_btn btn" onClick={()=>filterReviews('negative')}>Negative</button>
            </div>
          </div>
        
          <button onClick={handleOpen} className="reviews_btn btn">{isOpen?'Close':'Review this product'}</button>

          <div className={isOpen?'active_modal':'modal'}>
            <div className="modal_container">
              <h2>Review</h2>
              <div>{reviewStars}</div>
              
              <textarea 
                value={text} 
                onChange={(e)=>setText(e.target.value)}
              />
              <button
                className="btn"
                onClick={()=>{addNewReview(rating, text, itemId)
                  calcRating()
                }}>Submit</button>
            </div>
          </div>
        
          <div className="reviews_container-list">
          {
            isFiltered?
            <>
            {
              filteredReviews.length?
                filteredReviews.map(item =>
                  <ReviewsItem key={item.id} item={item} removeReviewById={removeReviewById} calcRating={calcRating} />
                )  
              :
              <p className="reviews_filter">No {filterValue} reviews</p>
            }
            </>
            
            :
            reviews.map(item =>
              <ReviewsItem key={item.id} item={item} removeReviewById={removeReviewById} calcRating={calcRating} />
            )
          }
          </div>
            
        </div>  
        :
        <div className="reviews_container">
          <div className="reviews_container-top">
            <div className="reviews_top-title">
              <h2>No reviews yet. Be the first to add a review</h2>
            </div>  
          </div>
          <button onClick={handleOpen} className="reviews_btn btn">{isOpen?'Close':'Review this product'}</button>
        </div>  
    }
    
    <div className={isOpen?'active_modal':'modal'}>
      <div className="active_modal-container modal_container">
        <h2>Review</h2>
        <div>{reviewStars}</div>
        
        <textarea 
          value={text} 
          onChange={(e)=>setText(e.target.value)}
        />
        <button
          className="btn"
          onClick={()=>{addNewReview(rating, text, itemId)
            calcRating()
          }}>Submit</button>
      </div>
    </div>
    </>
  )
}

export default Reviews