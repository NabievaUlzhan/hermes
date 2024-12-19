import axios from 'axios';
import {getClothesAction} from '../store/clothesReducer'

export const getClothes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://672e3bea229a881691ef6f8c.mockapi.io/clothes/cosmetics');
      dispatch(getClothesAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

