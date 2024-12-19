import axios from 'axios';
import { getUsersAction, addUserAction } from '../store/usersReducer'

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://674eed9cbb559617b26d4b22.mockapi.io/users');
      dispatch(getUsersAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://674eed9cbb559617b26d4b22.mockapi.io/users', user);
      dispatch(addUserAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};

export const editUser = (id, body) => {
  return async () => {
    try {
      const response = await axios.put(`https://674eed9cbb559617b26d4b22.mockapi.io/users/${id}`, body);
      // dispatch(addUserAction(response.data));
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };
};