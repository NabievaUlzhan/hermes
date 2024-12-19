import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from "redux-thunk";
import {clothesReducer, defaultState} from './clothesReducer'
import { cartReducer } from "./cartReducer";
import { usersReducer } from "./usersReducer";

const rootReducer = combineReducers({
    clothesReducer,
    usersReducer,
    cartReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));