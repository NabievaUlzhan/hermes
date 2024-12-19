import axios from 'axios';
import { getCartAction, addCartAction, removeCartAction } from '../store/cartReducer'

export const getCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://674eed9cbb559617b26d4b22.mockapi.io/cart');
      dispatch(getCartAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

export const addCart = (item) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://674eed9cbb559617b26d4b22.mockapi.io/cart', item);
      dispatch(addCartAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

export const removeCart = (cart_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`https://674eed9cbb559617b26d4b22.mockapi.io/cart/${cart_id}`);
      dispatch(removeCartAction(cart_id));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};
