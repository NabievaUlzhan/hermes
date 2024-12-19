import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { removeReview } from "../../API/ReviewsService";
import Reviews from "./Reviews";

const ReviewsItem = ({item, removeReviewById, calcRating}) => {
  let date = new Date(item.date) 
  let stars = [];  
  for (let i = 1; i <= 5; i++) {
  if (i <= item.rating) {
    stars.push(<img key={i} className="star" src="https://www.svgrepo.com/show/473405/star-filled.svg" />);
  } 
  else{ 
    stars.push(<img key={i} className="star" src="https://www.svgrepo.com/show/473404/star.svg" />);
  }
  }  

  const dispatch = useDispatch()

  let [isRemoveable, setIsRemoveable] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  function checkRemoveable(email){
    if(user.email === email){
      setIsRemoveable(!isRemoveable)
    }
  }

  // function removeReviewById(id) {
  //   dispatch(removeReview(id))
    
  // }

  return(
    <div className="reviews_list-one" key={item.id} onMouseEnter={()=>checkRemoveable(item.email)}>
      <div className="reviews_one-title">
        <div className="reviews_title-user">
          <img className="ava" src='https://www.svgrepo.com/show/341258/user-avatar-filled-alt.svg' alt="" /> 
          <p>{item.name}  </p>  
          {
            isRemoveable?
            <img 
              className="sidebar_top-close" 
              src="https://www.svgrepo.com/show/500351/close.svg"
              onClick={()=>{removeReviewById(item.id)
                calcRating()
              }} />
            :
            <></>
          }
        </div>
        
        <p className="date">{date.toISOString().split('T')[0]}  </p> 
        {/*  */}
        <p>{stars}</p>
      </div>
      <p>{item.text}</p>
    </div>    
  )
}

export default ReviewsItem