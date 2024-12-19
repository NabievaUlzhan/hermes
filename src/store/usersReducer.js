const defaultState = {
  users: []
}

const GET_USERS = 'GET_USERS'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {  
    case GET_USERS:
      return {...state, users: action.payload}
    case ADD_USER:
      return {...state, users: [...state.users, action.payload]}
    default:
      return state
  }
}

export const getUsersAction = (payload) => ({type: GET_USERS, payload})
export const addUserAction = (payload) => ({type: ADD_USER, payload})