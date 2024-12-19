import axios from 'axios';
import { getReviewsAction, addReviewAction, removeReviewAction } from '../store/clothesReducer'

export const getReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://672e3bea229a881691ef6f8c.mockapi.io/clothes/reviews');
      dispatch(getReviewsAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://672e3bea229a881691ef6f8c.mockapi.io/clothes/reviews', review);
      dispatch(addReviewAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

export const removeReview = (user_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`https://672e3bea229a881691ef6f8c.mockapi.io/clothes/reviews/${user_id}`);
      dispatch(removeReviewAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};
