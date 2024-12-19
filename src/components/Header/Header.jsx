import React, {useState, useEffect} from "react";
import burger from '../../images/burger.svg'
import {Link} from "react-router-dom";
import {getClothesSearchAction, getClothesByIdAction, getFilteredClothesAction, getFilteredClothesByGenderAction } from '../../store/clothesReducer'
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "../Home/Sidebar/Sidebar";

const Header = ()=>{
  const [isSticky, setIsSticky] = useState(false);
  const [isOpened, setIsOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const dispatch = useDispatch();
  const clothesSearch = useSelector(state =>state.clothesReducer.clothesSearch)

  clothesSearch.length = 5

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
      setIsOpened(false)
    } else {
      setIsSticky(false);
    }
  };

  const handleOpen = (value) =>{
    setIsOpened(value)
  }

  const searchClothes = (value)=>{
    console.log(searchValue, clothesSearch)
    return dispatch(getClothesSearchAction(value))
  }

  // const search = ()=>{
  //   if(!searchValue){
  //     setIsSearch(false)
  //   }
  //   else if(searchValue){
  //     setIsSearch(true)
  //   }
  // }

  const [isVisible, setIsVisible] = useState(false)
  function showSidebar(){
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
  }
  function hideSidebar(){
    setIsVisible(false)
    document.body.style.overflow = ''
  }

  function showFilteredClothes(gender){
    return dispatch(getFilteredClothesByGenderAction(gender))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function showClothesById(id){
    return dispatch(getClothesByIdAction(id))
  }

  return(
    <>
      <div className={isSticky ? 'sticky overflow' : 'header overflow'} >
        <div className={isSticky ? 'header_opacity-none' : 'header_opacity'}></div>
        <div className="header_top" >
          <div className="header_left header_part">
            <div className="menu" onClick={()=>showSidebar()}>
              <img className="burger_menu" src={burger} alt="" />
              <p className="labels">Menu</p>
            </div>
            <div className={isOpened ? 'active_search-container' : 'search_container'} onFocus={()=>handleOpen(true)} >
              <img className={isOpened ? 'active_search-icon' : 'search_icon'} src="https://www.svgrepo.com/show/506313/search.svg" onClick={()=>handleOpen(true)} alt="" />
              <input onChange={(event)=>{setSearchValue(event.target.value)
                searchClothes(searchValue)}
              }
              className={isOpened ? 'active_search def_search' : 'search def_search'} type="text" placeholder='Search'
              />
              <img 
                className={isOpened ? 'active_search-close' : 'search_close'} 
                src="https://www.svgrepo.com/show/500351/close.svg" alt="" 
                onClick={()=>handleOpen(false)}  
              />
            </div>
          </div>
          <div className={isOpened ? 'active_header-center' : 'header_center header_part'}>
            <Link to="/">
              <img className="logo" src="https://logodix.com/logo/830925.png" alt="" />
            </Link>
            {/* <img src="https://logodix.com/logo/830925.png" alt="" className="logo" /> */}
          </div>
          <div className="header_right header_part">
            <div className="header_right-content">
              <Link to="/account">
                <div className="account link">
                  <p>
                    <img src="https://www.svgrepo.com/show/522690/user.svg" className="account_icon" alt="User" style={{width: 20, height: 20}} />
                    <span className="labels">Account</span>
                  </p>
                </div>
              </Link>
              <Link to="/cart">
                <div className="cart link">
                  <p>
                    <img src="https://www.svgrepo.com/show/97420/shopping-bag.svg" alt="User" style={{width: 20, height: 30}} />
                    <span className="labels">Cart</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={isOpened ? 'active_bottom-container overflow' : 'bottom_container overflow'}>
      <div className="bottom_container-content">
        <h3>Suggested Searches</h3>
        <hr />
        <Link to={'/clothes/' + 'men' + '/' + 'all'} onClick={()=>showFilteredClothes('Men')}>
          <p className="link">Men</p>
        </Link>
        <Link to={'/clothes/' + 'women' + '/' + 'all'} onClick={()=>showFilteredClothes('Women')}>
          <p className="link">Women</p>
        </Link>
        
        {/* <p>{searchValue}</p> */}
        {
          clothesSearch.length?
          clothesSearch.map(item=>{
            return(
              <>
               <div onClick={()=>{showClothesById(item.id)
                console.log(clothesSearch.length)
               }}>
                {
                  clothesSearch.length !== 0?
                    <>
                      <Link to={'/clothes/' + item.type.toLowerCase() + '/' + item.id}>
                        <p className="link">{item.for_who} | {item.type} | {item.name}</p>
                      </Link>
                    </>
                  :
                    <h3>No Suggested Searches</h3>
                }
               </div>
              </>
            )
          }):
          // <h3>No Suggested Searches</h3>
          <></>
        }
        {
          
        }
      </div>
        {/* {
          !searchValue?
            <div className="bottom_container-content">
              <h3>Suggested Searches</h3>
              {
                clothesSearch.map(item=>{
                  return(
                    <>
                    <p>{item.name}</p>
                    <p>{searchValue}</p>
                    </>
                  )
                })
              }
            </div>:
            <div className="bottom_container-content">
              <h3>No Suggested Searches</h3>
            </div>
        } */}
        
      </div>
      {isVisible?
        <div className="sidebar_container sidebar_overflow">
          <Sidebar hideSidebar={hideSidebar} />
        </div>
        
      :<></>}
    </>
    // onClick={()=>handleOpen(false)}
  )
}

export default Header