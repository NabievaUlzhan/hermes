import React, {useState} from "react";
import ClothesItem from "./ClothesItem";

const ClothesList = ({clothes, showClothes})=>{
  
  return(
    <div className="clothes_list">
    {clothes.map(item=>{
      return(
        <ClothesItem clothes={item} key={item.id} showClothes={showClothes} />
      )}
    )}
  </div>
  )
}

export default ClothesList