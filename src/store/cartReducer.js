const defaultState = {
  total: [],
  cart: []
}

// const GET_TOTAL = 'GET_TOTAL'
const COUNT_TOTAL = 'COUNT_TOTAL'
const GET_CART = 'GET_CART'
const ADD_CART = 'ADD_CART'
const REMOVE_CART = 'REMOVE_CART'
// const GET_CART_COUNT = 'GET_CART_COUNT'

export const cartReducer = (state = defaultState, action) => {
  switch (action.type) {  
    // case GET_TOTAL:
    //   return {...state, total: action.payload}
    case COUNT_TOTAL:
      return {...state, total: [...state.total, action.payload]}
    case GET_CART:
      return {...state, cart: action.payload}
    case ADD_CART:
      return {...state, cart: [...state.cart, action.payload]}
    case REMOVE_CART:
      return {...state, cart: state.cart.filter(item => item.id != action.payload)}

    // case GET_CART_COUNT:
    //   return {...state, cartCount: action.payload}

    default:
      return state
  }
}

// export const getTotalAction = (payload) => ({type: GET_TOTAL, payload})
export const countTotalAction = (payload) => ({type: COUNT_TOTAL, payload})
export const getCartAction = (payload) => ({type: GET_CART, payload})
export const addCartAction = (payload) => ({type: ADD_CART, payload})
export const removeCartAction = (payload) => ({type: REMOVE_CART, payload})
// export const getCartCount = (payload) => ({type: GET_CART_COUNT, payload})