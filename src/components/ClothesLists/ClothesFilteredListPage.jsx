import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getClothesByIdAction, getFilteredClothesByGenderAction, getFilteredClothesByGenderTypeAction } from "../../store/clothesReducer";
import ClothesList from "./ClothesList";
import BackButton from '../UI/button/BackButton'
import Loader from "../UI/loader/Loader";

const ClothesFilteredListPage = ()=>{
  const clothesByGender = useSelector(state =>state.clothesReducer.filteredClothesByGender)
  // console.log(clothesByGender)
  
  const [type, setType ] = useState()
  let [isLoading, setIsLoading] = useState(true)
  
  const dispatch = useDispatch();

  function showClothes(id){
    setIsLoading(false)
    return dispatch(getClothesByIdAction(id))
  }

  useEffect(() => {
    // setType(clothesByType[0].type)
    showClothes()
  }, [dispatch])

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
  
  const clothesTypes = findUniqueClothes(clothesByGender);
  let clothesByTypes = useSelector(state => state.clothesReducer.filteredClothesByGenderType)

  const [isAll, setIsAll] = useState(true)

  const sortByType = (item_type) => {
    console.log(clothesByGender)
    if(item_type === 'All'){
      setType(item_type)
      setIsAll(true)
    }
    else{
      dispatch(getFilteredClothesByGenderTypeAction(item_type))
      console.log(clothesByTypes)
      setIsAll(false)
    }
  }


  return(
    <div>
      <div className="clothes_id-header">
        <Header></Header>
      </div>

      <div className="clothes_id-container">
        <div className="clothes_id-back">
          <BackButton />
        </div>
        
        <div className="clothes_id-top">
          <p>{clothesByGender[0].for_who}</p>
          <h4>{type?type:'All'}|<span>({isAll?clothesByGender.length:clothesByTypes.length})</span></h4>
        </div>

        <div className="clothes_id-filter">
          <button onClick={()=>sortByType('All')} className="clothes_filter-btn">All</button>
          {
            clothesTypes.map(item=>
              <p onClick={()=>{
                sortByType(item.type)
                setType(item.type)
              }}
              className="clothes_filter-btn link"
              >{item.type}</p>
            )
          }
        </div>

        <div className="clothes_id-cards">
          {
            isLoading?
            <><Loader></Loader></>
            :
            <>
            {
              isAll?
              <ClothesList clothes={clothesByGender} showClothes={showClothes} />
              :
              <ClothesList clothes={clothesByTypes} showClothes={showClothes} />
            }
            </>

          }
          
        </div>
        
      </div>
      
      <Footer></Footer>
    </div>
  )
}

export default ClothesFilteredListPage