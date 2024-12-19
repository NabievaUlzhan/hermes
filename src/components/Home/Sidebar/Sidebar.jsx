import React, {useState} from "react";
// import {getFilteredClothesAction} from '../../../store/clothesReducer'
// import {useSelector, useDispatch} from 'react-redux'
import SidebarElement from "./SidebarElement";
import { Link } from "react-router-dom";

const Sidebar = ({hideSidebar})=>{
  // const dispatch = useDispatch();
  // const [isVisible, setIsVisible] = useState(false)

  // const filterClothesByGender = (gender)=>{
  //   setIsVisible(true)
  //   return dispatch(getFilteredClothesAction(gender))
  // }

  // const clothes = useSelector(state =>state.clothesReducer.clothes)
  // const filteredClothes = useSelector(state => state.clothesReducer.filteredClothes)

  // const findUniqueClothes = (clothes) => {
  //   const uniqueTypes = new Set();
    
  //   return clothes.reduce((arr, item) => {
  //     if (!uniqueTypes.has(item.type)) {
  //       uniqueTypes.add(item.type);
  //       arr.push(item);
  //     }
  //     return arr;
  //   }, []);
  // };

  // const clothesTypes = findUniqueClothes(filteredClothes);

  const [isChecked, setIsChecked] = useState(false)
  const setDarkMode = () =>{
    document.querySelector('body').setAttribute('data_theme', 'dark')
  }
  const setLightMode = () =>{
    document.querySelector('body').setAttribute('data_theme', 'light')
  }
  const toggleTheme = (e) => {
    setIsChecked(!isChecked)
    if (e.target.checked){
      setDarkMode()
    } 
    else{
      setLightMode()
    }
  }

  function hideScrolling(){
    document.body.style.overflow = ''
  }

  return(
    <>
    
      <div className="sidebar_bg" onClick={()=>hideSidebar()}></div>
      <div className="sidebar">
        <div className="sidebar_content">
          <div className="sidebar_top" onClick={()=>hideSidebar()}>
            <h3>Menu</h3>
            <img className="sidebar_top-close"  src="https://www.svgrepo.com/show/500351/close.svg" alt="" />
          </div>

          <div>
            <SidebarElement gender={'Women'}></SidebarElement>
            <SidebarElement gender={'Men'}></SidebarElement>

          </div>

          <hr />
          {/* <Link to="/about"><p onClick={hideScrolling}>About us</p></Link> */}
          <Link to="/account">
            <p className="sidebar_title" onClick={hideScrolling}>Account</p>
          </Link>
          <Link to="/cart">
            <p className="sidebar_title" onClick={hideScrolling}>Cart</p>
          </Link>
        </div>
          
        
        <div className="sidebar_bottom">
          <div className="theme_container">
            
            {
              isChecked?
              <div className="theme_dark" id="mode">
                <div id="circle">
                 {/* <img src="https://www.svgrepo.com/show/103732/moon.svg" alt="" id="theme_icon" />  */}
                 <img src="https://www.svgrepo.com/show/110261/moon.svg" alt="" id="theme_icon" /> 
                </div>
                
              </div>
              :
              <div className="theme_light" id="mode">
                <div id="circle">
                  {/* <img src="https://www.svgrepo.com/show/513508/sun.svg" alt="" id="theme_icon" /> */}
                  <img src="https://www.svgrepo.com/show/102038/sun.svg" alt="" id="theme_icon" />
                </div>
                
              </div>
            }
            <input type="checkbox" onChange={toggleTheme} id="theme_checkbox" />
          </div>
        </div>
      </div>  
      </>
    // </div>
    
  )
}

export default Sidebar