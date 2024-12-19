import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getClothesByIdAction, selectedFilteredClothesAction, sortHighestClothesAction, sortLowestClothesAction } from "../../store/clothesReducer";
import ClothesList from "./ClothesList";
import BackButton from '../UI/button/BackButton'
// import {getFilteredClothes} from '../../API/ClothesService'
import Loader from '../UI/loader/Loader'
import { Link } from "react-router-dom";
// import Select from '../UI/select/Select'
// import ClothesFilter from "./ClothesFilter";

const ClothesListsPage = ()=>{
  const clothesByType = useSelector(state =>state.clothesReducer.clothesByTypes)
  const filteredClothes = useSelector(state => state.clothesReducer.selectedFilteredClothes)
  const sortedClothes = useSelector(state => state.clothesReducer.sortedClothes)
  // filteredClothes.length = 0
  const [gender, setGender ] = useState()
  const [type, setType ] = useState()
  let [isLoading, setIsLoading] = useState(true)
  // let [count, setCount] = useState(10)
  const [filter, setFilter] = useState({sort: '', query: ''})
  const dispatch = useDispatch();
  const [isFiltering, setIsFiltering] = useState(false)

  function showClothes(id){
    setIsLoading(false)
    return dispatch(getClothesByIdAction(id))
  }

  const [country, setCountry] = useState()
  const [material, setMaterial] = useState()
  const [color, setColor] = useState()
  const [season, setSeason] = useState()

  const filterObj = {
    country: country,
    material: material,
    color: color,
    season: season
  }

  const filterClothes = () => {
    setIsLoading(false)
    dispatch(selectedFilteredClothesAction(filterObj))
    setIsFiltering(true)
  }

  console.log(filteredClothes)

  const sortClothes = (value) => {
    setFilter(value)
    setIsLoading(true)
    if(value == 'lowest'){
      return (
        dispatch(sortLowestClothesAction()),
        setIsLoading(false)
      )
    }
    if(value == 'highest'){
      return (
        dispatch(sortHighestClothesAction()),
        setIsLoading(false)
      )
    }
    
  }

  const resetFilters = () => {
    setIsFiltering(false)
    setCountry('')
    setMaterial('')
    setColor('')
    setSeason('')
  }

  const findUniqueClothes = (clothes, value) => {
    const uniqueTypes = new Set();
    
    return clothes.reduce((acc, item) => {
      if (!uniqueTypes.has(item[value])) {
        uniqueTypes.add(item[value]);
        acc.push(item);
      }
      return acc;
    }, []);
  };
  
  const clothesUniqueColor = findUniqueClothes(clothesByType, 'color');
  const clothesUniqueCountry = findUniqueClothes(clothesByType, 'country');
  const clothesUniqueMaterial = findUniqueClothes(clothesByType, 'material');
  const clothesUniqueSeason = findUniqueClothes(clothesByType, 'season');

  useEffect(() => {
    setGender(clothesByType[0].for_who)
    setType(clothesByType[0].type)
    showClothes()
    // console.log('filter',filteredClothes)
  }, [dispatch])

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
          {/* <p>{gender}</p> */}
          <h4>{type}|<span>({clothesByType.length})</span></h4>
        </div>

        <div className="clothes_id-filter">
          <div className="clothes_filter-options">
            
            <select onChange={(e)=>setCountry(e.target.value)}>
              <option selected="true" disabled="disabled">Country</option>
              <option>All</option>
              {
                clothesUniqueCountry.map(item=>
                  <option key={item.id} value={item.coutry}>{item.country}</option>)
              }
            </select>

            <select onChange={(e)=>{
              // setIsLoading(true)
              setMaterial(e.target.value)
              // filterClothes()
            }}>
            <option selected="true" disabled="disabled">Material</option>
            <option>All</option>
              {
                clothesUniqueMaterial.map(item=>
                  <option key={item.id} value={item.material}>{item.material}</option>)
              }
            </select>

            <select onChange={(e)=>{
              // setIsLoading(true)
              setColor(e.target.value)
              // filterClothes()
            }}>
            <option selected="true" disabled="disabled">Color</option>
            <option>All</option>
              {
                clothesUniqueColor.map(item=>
                  <option key={item.id} value={item.color}>{item.color}</option>)
              }
            </select>

            <select onChange={(e)=>{
              // setIsLoading(true)
              setSeason(e.target.value)
              // filterClothes()
            }}>
            <option selected="true" disabled="disabled">Season</option>
            <option>All</option>
              {
                clothesUniqueSeason.map(item=>
                  <option key={item.id} value={item.season}>{item.season}</option>)
              }
            </select>
            
            <Link>
            <span onClick={()=>{
              setIsFiltering(true)
              filterClothes()
            }}>Show</span>
            </Link>
            
            <Link>
            <span onClick={resetFilters}>Reset</span> 
            </Link>
             
          </div>

          
          <div className="clothes_filter-price">
            <select value={filter} onChange={(e)=>sortClothes(e.target.value) }>
              <option selected="true" disabled="disabled">Sort by price</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
            
          </div>
        </div>

        <div className="clothes_id-cards">
          {
            isLoading?
            <Loader></Loader>
            :
            <>
            
            {
              isFiltering && !filteredClothes.length?
              <>
                <p>No matches</p>
                <button onClick={resetFilters} className="btn reviews_btn">reset</button>  
              </>
              :
              <>
              {
                isFiltering?
                <ClothesList clothes={filteredClothes} showClothes={showClothes}></ClothesList>
                :
                <ClothesList clothes={clothesByType} showClothes={showClothes}></ClothesList>
              }
              </>
            }
            </>
          }
          
        </div>
        
      </div>
      
      <Footer></Footer>
    </div>
  )
}

export default ClothesListsPage