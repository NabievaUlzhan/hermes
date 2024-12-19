export const defaultState = {
  clothes: [],
  clothesByTypes: [],
  clothesById: [],
  clothesSearch: [],
  // cartItems: [],
  filteredClothes: [],
  selectedFilteredClothes: [],
  sortedClothes: [],

  reviews: [],
  reviewsById: [],
  filteredReviews: [],

  filteredClothesByGender: [],
  filteredClothesByGenderType: [],

  // filteredClothesByTypes: []
}

const GET_CLOTHES = 'GET_CLOTHES'
const GET_CLOTHES_BY_TYPES = 'GET_CLOTHES_BY_TYPES'
const GET_CLOTHES_BY_ID = 'GET_CLOTHES_BY_ID'
const GET_CLOTHES_SEARCH = 'GET_CLOTHES_SEARCH'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const ADD_CART_ITEM_NEW = 'ADD_CART_ITEM_NEW'
const GET_FILTERED_CLOTHES = 'GET_FILTERED_CLOTHES'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const SELECT_FILTERED_CLOTHES = 'SELECT_FILTERED_CLOTHES'
const SORT_HIGHEST_CLOTHES = 'SORT_HIGHEST_CLOTHES'
const SORT_LOWEST_CLOTHES = 'SORT_LOWEST_CLOTHES '
const GET_FILTERED_CLOTHES_BY_GENDER = 'GET_FILTERED_CLOTHES_BY_GENDER'
const GET_FILTERED_CLOTHES_BY_GENDER_TYPE = 'GET_FILTERED_CLOTHES_BY_GENDER_TYPE'

const GET_REVIEWS = 'GET_REVIEWS'
const GET_REVIEWS_BY_ID = 'GET_REVIEWS_BY_ID'
const ADD_REVIEW = 'ADD_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const FILTER_REVIEWS = 'FILTER_REVIEWS'

// const FILTER_CLOTHES_BY_TYPES = 'FILTER_CLOTHES_BY_TYPES'

export const clothesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CLOTHES:
      return {...state, clothes: [...action.payload]}
    case GET_CLOTHES_BY_TYPES:
      if(action.payload.for_who){
        return {...state, clothesByTypes: state.clothes.filter(item => 
          item.type === action.payload.type
          && item.for_who === action.payload.for_who
        )}  
      }
      else{
        return {...state, clothesByTypes: state.clothes.filter(item => item.type === action.payload)}  
      }
    case GET_CLOTHES_BY_ID:
      return {...state, clothesById: state.clothes.filter(item => item.id == action.payload)}
    case GET_CLOTHES_SEARCH:
      return {...state, clothesSearch: state.clothes.filter(item => item.type.toLowerCase().includes(action.payload.toLowerCase()) 
      || item.name.toLowerCase().includes(action.payload.toLowerCase())
      || item.for_who.toLowerCase().includes(action.payload.toLowerCase()) )}
    // case ADD_CART_ITEM:
    //   return {...state, cartItems: [...state.cartItems, ...state.clothes.filter(item => item.id == action.payload)]}
    case GET_FILTERED_CLOTHES:
      return{...state, filteredClothes: state.clothes.filter(item=>item.for_who === action.payload)}
    // case REMOVE_CART_ITEM:
    //   return{...state, cartItems: state.cartItems.filter(item=> item.id !== action.payload)}
    case SELECT_FILTERED_CLOTHES:
        return{...state, selectedFilteredClothes: state.clothesByTypes.filter(item=> 
          (action.payload.material == 'All' || !action.payload.material? item.material : item.material === action.payload.material) &&
          (action.payload.country == 'All' || !action.payload.country? item.country : item.country === action.payload.country) &&
          (action.payload.color == 'All' || !action.payload.color? item.color : item.color === action.payload.color) &&
          (action.payload.season == 'All' || !action.payload.season? item.season : item.season === action.payload.season) 
        )}
    case SORT_HIGHEST_CLOTHES:
      return{...state, sortedClothes: state.clothesByTypes.sort((a, b) => 
        a.price.toString().localeCompare(b.price.toString(), undefined, { numeric: true })).reverse()
      }
    case SORT_LOWEST_CLOTHES:
      return{...state, sortedClothes: state.clothesByTypes.sort((a, b) => 
        a.price.toString().localeCompare(b.price.toString(), undefined, { numeric: true }))
      }      
    
    case GET_REVIEWS:
      return{...state, reviews: [...action.payload]}
    case GET_REVIEWS_BY_ID:
      return {...state, reviewsById: state.reviews.filter(item => item.item_id == action.payload)}
    case ADD_REVIEW:
      return {...state, reviewsById: [...state.reviewsById, action.payload]}
    case REMOVE_REVIEW:
      return {...state, reviewsById: [...state.reviewsById.filter(item=> item.id !== action.payload.id)]}
    case FILTER_REVIEWS:
      if(action.payload === 'positive'){
        return {...state, filteredReviews: [...state.reviewsById.filter(item=> item.rating >= 3)]}
      }
      else if(action.payload === 'negative'){
        return {...state, filteredReviews: [...state.reviewsById.filter(item=> item.rating < 3)]}
      }
      else if(action.payload === 'all'){
        return {...state, filteredReviews: []}
      }

    case GET_FILTERED_CLOTHES_BY_GENDER:
      return {...state, filteredClothesByGender: state.clothes.filter(item => item.for_who == action.payload)}
    case GET_FILTERED_CLOTHES_BY_GENDER_TYPE:
      return {...state, filteredClothesByGenderType: state.filteredClothesByGender.filter(item => item.type === action.payload)}

    default:
      return state
  }
}

export const getClothesAction = (payload) => ({type: GET_CLOTHES, payload})
// export const addClothesAction = (payload) => ({type: ADD_CLOTHES, payload})
// export const removeClothesAction = (payload) => ({type: REMOVE_CLOTHES, payload})
export const getClothesByTypes = (payload) => ({type: GET_CLOTHES_BY_TYPES, payload})
export const getClothesByIdAction = (payload) => ({type: GET_CLOTHES_BY_ID, payload})
export const getClothesSearchAction = (payload) => ({type: GET_CLOTHES_SEARCH, payload})
// export const addCartItem = (payload) => ({type: ADD_CART_ITEM, payload})
// export const addCartItemNew = (payload) => ({type: ADD_CART_ITEM_NEW, payload})
export const getFilteredClothesAction = (payload) => ({type: GET_FILTERED_CLOTHES, payload})
// export const getFilteredClothesByTypeAction = (payload) => ({type: GET_FILTERED_CLOTHES_BY_TYPE, payload})
export const removeCartItemAction = (payload) => ({type: REMOVE_CART_ITEM, payload})
export const selectedFilteredClothesAction = (payload) => ({type: SELECT_FILTERED_CLOTHES, payload})
// export const sortClothesAction = (payload) => ({type: SORT_CLOTHES, payload})
export const sortHighestClothesAction = (payload) => ({type: SORT_HIGHEST_CLOTHES, payload})
export const sortLowestClothesAction = (payload) => ({type: SORT_LOWEST_CLOTHES, payload})

export const getReviewsAction = (payload) => ({type: GET_REVIEWS, payload})
export const getReviewsByIdAction = (payload) => ({type: GET_REVIEWS_BY_ID, payload})
export const addReviewAction = (payload) => ({type: ADD_REVIEW, payload})
export const removeReviewAction = (payload) => ({type: REMOVE_REVIEW, payload})
export const filterReviewsAction = (payload) => ({type: FILTER_REVIEWS, payload})

export const getFilteredClothesByGenderAction = (payload) => ({type: GET_FILTERED_CLOTHES_BY_GENDER, payload})
export const getFilteredClothesByGenderTypeAction = (payload) => ({type: GET_FILTERED_CLOTHES_BY_GENDER_TYPE, payload})