import React, { useEffect, useState } from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {getClothes, getFilteredClothes} from '../../API/ClothesService'
import { getReviews } from "../../API/ReviewsService";
import {useDispatch, useSelector} from "react-redux";
import ClothesTypesList from "./ClothesTypesList";
import ClothesList from "../ClothesLists/ClothesList";
import {getClothesByIdAction, getClothesByTypes} from '../../store/clothesReducer'
// import {removeUserAction, usersReducer} from "../store/UsersReducer";
import Sidebar from "./Sidebar/Sidebar";
import Loader from "../UI/loader/Loader";
import { getCart } from "../../API/CartService";

const HomePage = ()=>{
  const dispatch = useDispatch();
  const clothes = useSelector(state =>state.clothesReducer.clothes)
  // const clothesArray = clothes
  // const [clothesArray, setClothesArray] = useState([])
  // setClothesArray(clothes)
  const [isLoading, setIsLoading] = useState(true)  
  // let [count, setCount] = useState(4)
  // clothesArray.length = count
  
  // let [clothesArray, setClothesArray] = useState([...clothes.reverse()])
  // clothesArray.length = count

  function showClothes(){
    return dispatch(getClothes())
  }

  function showClothesById(id){
    return dispatch(getClothesByIdAction(id))
  }

  // function showClothesByType(){
  //   return dispatch(getClothesByTypes(clothes[0]))
  // }
  
  const findUniqueClothes = (clothes) => {
    const uniqueTypes = new Set();
    
    return clothes.reduce((acc, item) => {
      if (!uniqueTypes.has(item.type)) {
        uniqueTypes.add(item.type);
        acc.push(item);
      }
      return acc;
    }, []);
  };
  
  const clothesTypes = findUniqueClothes(clothes);
  // clothesTypes.length = 12
  // console.log(clothesTypes);
 
  // clothes.map(item=>{
  //   clothesTypes.map(type=>{
  //     if(type != item.type){
  //       clothesTypes.push(item.type)
  //     }
  //   })
  // })

  // function showClothesByType(type){
  //   let clothesByType = [];
  //   clothes.filter(item=>{
  //     if(item.type == type){
  //       clothesByType.push(item)
  //     }
  //   })

  //   console.log(clothesByType)
  // }

  // const bags = 'bags'

  // function increaseCount(){
  //   // setCount(0)
  //   // clothes.length = 0
  //   setCount(count+=20)
  //   clothesArray.length = count
  //   showClothes()
  // }

  function showReviews(){
    return dispatch(getReviews())
  }

  function getCartItems(){
    return dispatch(getCart())
  }

  // function qwer(){
  //   dispatch(getFilteredClothes())
  // }



  // const [isVisible, setIsVisible] = useState(false)
  // function showSidebar(){
  //   setIsVisible(true)
  // }
  // function hideSidebar(){
  //   setIsVisible(false)
  // }


  const itemCount = 12
  const [currentPage, setCurrentPage] = useState(1)
  const pagesCount = Math.ceil(clothes.length / itemCount) 

  const changeCurrentPage = (num) => {
    setCurrentPage(num)
    setIsLoading(false)
  }

  const clothesArray = clothes.slice((currentPage - 1) * itemCount, (currentPage - 1) * itemCount + itemCount)
  // let pagesCountArray = [];

  // function renderPagesArray(){
  //   setIsLoading(true)
  //   for (let i = 1; i <= pagesCount; i++) {
  //     pagesCountArray.push(i)
  //   } 
  //   return pagesCountArray
  // }

  // renderPagesArray() 

  useEffect(() => {
    showClothes()
    showReviews()
    getCartItems()
    if(clothes){
      setIsLoading(false)
    }
  }, [dispatch])

  
  return(
    <>
    {
      isLoading?
      <Loader></Loader>
      :
      <>

      <header className="homepage_header overflow">
        <Header></Header>
        <div className="header_content">
          <div className="bgdiv">
            <img className="bg" src="https://assets.hermes.com/is/image/hermesedito/P_169_AH24_S_EDITOCONTENT_TWILLY?fit=wrap%2C0&wid=1920" alt="" />
          </div>
          
          <div className="header_content-text">
            {/* <h1>The Faubourg in silky tones</h1>
            <p>A Twilly scarf around your neck honors the iconic Grand Apparat motif.</p>
            <p>Reflecting the original designs, its new striking color combinations make it more contemporary than ever.</p> */}
          </div>
        </div>
      </header>  

      <main className="homepage_main overflow">
        <section>
          {/* {
            isLoading?
            <Loader></Loader>
            :
            <ClothesTypesList clothes={clothesTypes}></ClothesTypesList>
          } */}
          <ClothesTypesList clothes={clothesTypes.reverse()}></ClothesTypesList>
        </section>

        <section className="banner">
          <div className="banner_text">
            <h2>Stylish and comfortable</h2>
            <p>These innovative boots for roaming the streets take footwear design to the next level.</p>
            {/* <a href="" className="banner_link link">Discover</a> */}
          </div>
          <img className="banner_poster" src="https://assets.hermes.com/is/image/hermesedito/P_169_AH24_Z_EDITOCONTENT_BOTTES?fit=wrap%2C0&wid=1920" alt="" />
        </section>

        <section>
          <ClothesList clothes={clothesArray} showClothes={showClothesById}></ClothesList>
          {/* <button className="btn" onClick={increaseCount}>Load More</button> */}
          <p className="pagination_info">
            {(currentPage - 1) * itemCount + 1} - {
             ((currentPage - 1) * itemCount + itemCount) > clothes.length?clothes.length:(currentPage - 1) * itemCount + itemCount
            }  Items over {clothes.length}
          </p>
          <div className="pagination_container">
            {/* {pagesCountArray.map(item=>
              <button key={item} onClick={()=>changeCurrentPage(item)} className="pagination_btn">{item}</button>
            )} */}
            <div className="pagination_prev">
            <img 
              style={{width: 20, transform: 'rotate(180deg)'}} 
              src="https://www.svgrepo.com/show/449159/next.svg" 
              onClick={()=>{
                setIsLoading(true)
                changeCurrentPage(currentPage - 1 != 0?currentPage - 1: currentPage)
              }}
            />
            </div>
            
            <p className="pagination_text">{currentPage}</p>
            <div className="pagination_next">
            <img 
              style={{width: 20}}
              onClick={()=>{
                setIsLoading(true)
                changeCurrentPage(currentPage + 1 > pagesCount? currentPage : currentPage + 1)
              }}
              src='https://www.svgrepo.com/show/449159/next.svg' 
            />
            </div>
            
          </div>
        </section>

        <section className="banner">
          <div className="banner_text">
            <h2>Mirror, mirror on the wall</h2>
            <p>What is the most beautiful Clic bracelet in Faubourg? All of them, replied the reflection, dazzled by the shimmering bracelets. Time goes by, but the icon is everlasting.</p>
            {/* <a href="" className="banner_link link">Discover</a> */}
          </div>
          <img className="banner_poster" src="https://assets.hermes.com/is/image/hermesedito/P_169_AH24_F_EDITOCONTENT_BRACELETS?fit=wrap%2C0&wid=1920" alt="" />
        </section>
      </main>

        <Footer></Footer>
        </>
}
    </>
  )
}
export default HomePage;