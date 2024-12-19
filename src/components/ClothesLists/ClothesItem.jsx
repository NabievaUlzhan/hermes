import React, {useState} from "react";
import {Link} from "react-router-dom";

const ClothesItem = ({clothes, showClothes})=>{
  const [index, setIndex] = useState(true)

  function changePoster(){
    // this.className.add('clothes_poster-animation')
    setIndex(!index)
  }

  return(
    <Link className='clothes_card' to={'/clothes/' + clothes.type.toLowerCase() + '/' + clothes.id} key={clothes.id}>
    <div key={clothes.id} onClick={()=>showClothes(clothes.id)}>
      {
        clothes.poster[1]?
        index?
        <img src={clothes.poster[0]} alt="" onMouseEnter={changePoster} />
        :
        <img src={clothes.poster[1]} alt="" onMouseLeave={changePoster} className="clothes_poster-animation"/>
        :
        <img src={clothes.poster[0]} alt="" onMouseEnter={changePoster} />
        
      }
      <h4 className="link">{clothes.name}</h4>
      <p className="link">${clothes.price}</p>
    </div>
    </Link>
  )
}

export default ClothesItem