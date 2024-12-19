import ClothesListsPage from "../components/ClothesLists/ClothesListPage"
import HomePage from "../components/Home/HomePage"
import ClothesByIdPage from "../components/ClothesById/ClothesByIdPage"
import AboutPage from "../components/Home/AboutPage"
import CartPage from '../components/Header/cart/CartPage'
import AccountPage from "../components/Header/account/AccountPage"
import ClothesFilteredListPage from "../components/ClothesLists/ClothesFilteredListPage"
import AccountCreatePage from "../components/Header/account/AccountCreatePage"

export const routes = [
  {path: '/', element: <HomePage/>, exact: false},
  {path: '/clothes/:type', element: <ClothesListsPage />, exact: true},
  {path: '/clothes/:type/:id', element: <ClothesByIdPage />, exact: true},
  {path: '/about', element: <AboutPage />, exact: true},
  {path: '/cart', element: <CartPage />, exact: true},
  {path: '/account', element: <AccountPage />, exact: true},
  {path: '/account/create', element: <AccountCreatePage />, exact: true},
  {path: '/clothes/:for_who/all', element: <ClothesFilteredListPage />, exact: true},

//   {path: '/posts', element: <PostsPage/>, exact: true},
//   {path: '/posts/:id', element: <PostPage/>, exact: true},
]