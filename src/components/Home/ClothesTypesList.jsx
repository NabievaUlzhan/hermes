import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getClothesByTypes } from "../../store/clothesReducer";

const ClothesTypesList = ({clothes})=>{
  const dispatch = useDispatch();
  // const clothesByType = useSelector(state =>state.clothesReducer.clothesByTypes)
  // console.log(clothesByType)

  const showClothes = (clothes) => {
    return dispatch(getClothesByTypes(clothes))
  }

  // useEffect(() => {
  //   showClothes()
  // }, [dispatch])

  return(
      <div className="clothes_list">
        {clothes.map(item=>{
          return(
            <Link className='clothes_card' to={'/clothes/' + item.type.toLowerCase()} key={item.id}>
              <div onClick={()=>showClothes(item.type)} className="link">
                <img src={item.poster[0]} alt="" />
                <h4>{item.type}</h4>
              </div>
            </Link>
          )}
        )}
      </div>
  )
}

export default ClothesTypesList