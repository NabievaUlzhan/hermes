import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getFilteredClothesAction} from '../../../store/clothesReducer'
import {useSelector, useDispatch} from 'react-redux'
import { getClothesByTypes } from "../../../store/clothesReducer";

const SidebarElement = ({gender}) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisible = ()=>{
    setIsVisible(!isVisible)
  }

  const dispatch = useDispatch()

  const clothes = useSelector(state => state.clothesReducer.clothes)

  const findUniqueClothes = (clothes, gender) => {
    const uniqueTypes = new Set();
    
    return clothes.reduce((arr, item) => {
      if (!uniqueTypes.has(item.type) && item.for_who == gender) {
        uniqueTypes.add(item.type);
        arr.push(item);
      }
      return arr;
    }, []);
  };

  function showClothes(clothes){
    return dispatch(getClothesByTypes(clothes))
  }

  const clothesTypes = findUniqueClothes(clothes, gender);

  function hideScrolling(){
    document.body.style.overflow = ''
  }

  return(
    <>
      <div className="sidebar_title-container" onClick={toggleVisible}>
        <h4  className="sidebar_title">{gender}</h4>
        {
          isVisible? 
          <img className="up_down" src="https://www.svgrepo.com/show/449310/up.svg" alt="" />
          : <img className="up_down" src="https://www.svgrepo.com/show/449059/down.svg" alt="" />
        }
        {/* <p className="sidebar_title">{isVisible? '-' : '+'}</p> */}
      </div>
      
        
        {
          isVisible?
          <>
          <div className="sidebar_types">
            {clothesTypes.map(item => {
              if(item.for_who == gender){
                return(
                  <Link to="/clothes/type" key={item.id}>
                    <h5 
                      onClick={()=>{
                        showClothes(item)
                        hideScrolling()
                      }} 
                      className="link sidebar_type" 
                      key={item.id}>{item.type}
                    </h5>
                  </Link>
                )
              }
            })}
          </div>
            {
            gender=='Women'?
            <img className="sidebar_poster" src="https://assets.hermes.com/is/image/hermesedito/P_169_HEADER_CROSS?fit=wrap%2C0&wid=1920" />  
            :
            <img className="sidebar_poster" src="https://assets.hermes.com/is/image/hermesedito/P_169_HEADER_Homme_AH24?fit=wrap%2C0&wid=1920"></img>
            }
            
          
          </>
          :
          <></>
        }
    </>
  )
}

export default SidebarElement