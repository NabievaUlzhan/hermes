import React, { useState, useEffect } from "react";
import Header from "../Header";
import BackButton from "../../UI/button/BackButton";
import { getUsers} from '../../../API/UsersService'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../../../context/index";
import { editUser } from '../../../API/UsersService'

const AccountPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(state =>state.usersReducer.users)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  function checkEmail(){
    if(users.length){
      let count = 0
      users.map(item=>{
        if(item.email == email){
          setIsOpen(true)
          count++
          if(item.password == password){
            localStorage.setItem('auth', 'true')
            setIsAuth(true)
            localStorage.setItem('user', JSON.stringify({
              "email": "qwe@gmail.com",
              "id": "7",
              "password": "12345678",
              "first_name": "Adam",
              "last_name": "Adamson"
            }
          ))
            navigate('/')
          }
          else if(item.password !== password && password !== ''){
            // console.log('error')
            setIsError(true)
            setError('The Email Address or Password you entered is incorrect.')
          }
        }
      })
      if(count == 0){
        navigate('/account/create')
        console.log(users)
        console.log(email)
      }
    }
    else{
      navigate('/account/create')
    }
  }

  function showUsers(){
    return dispatch(getUsers())
  }

  function editAccount(id){
    const body = {
      first_name: fname,
      last_name: lname,
      password: user.password,
      email: user.email
    }
    dispatch(editUser(id, body))
    localStorage.setItem('user', JSON.stringify(body))
    setIsEditing(false)
  }

  function holdEditing(){
    setIsEditing(true)
  }

  // const [isAuth, setIsAuth] = useState(false)

  // const user = JSON.parse(localStorage.getItem('user'))

  function logout(){
    localStorage.setItem('auth', 'false')
    setIsAuth(false)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    showUsers()
    if (localStorage.getItem('auth') == 'true'){
      setIsAuth(true)
    }
  }, [])

  const cart = useSelector(state => state.cartReducer.cart)

  return(
    <>
      <div className="account_header overflow">
        <Header></Header>
      </div>
      {
        isAuth?
        <div className="account_container width_true">

          <div className="account_container-user">
            <h2 className="account_user-name">{user.first_name} {user.last_name}</h2>
            <p className="account_user-email">{user.email}</p>
            <p onClick={holdEditing}>
              <img 
                src="https://www.svgrepo.com/show/486226/edit-backup.svg" 
                className="account_user-edit" /> Edit</p>
            <a className="account_user-logout sec_link" href="" onClick={logout}>Log out</a>
          </div>

          <hr />

          <div className="account_container-cart">

          {
            !isEditing?
            <>
            <h2 className="account_cart-title">Your Cart</h2>
            {
              cart.length !== 0?
              <>
                <p className="account_cart-text">You have {cart.length} item in your cart.</p>
                <Link to='/cart'><button className="account_cart-btn btn">Go To Cart</button></Link>  
              </>
              :
              <>
                <p className="account_cart-text">You haven't bought anything yet.</p>
                <p className="account_cart-text">It's time to make your first order!</p>
                <Link to='/'><button className="account_cart-btn btn">Go Shopping</button></Link>  
              </>
            }
            </>
            :
            <>
            <h2 className="account_cart-title">Personal Information</h2>
            <input value={fname} onChange={(e)=> setFname(e.target.value)} type="text" placeholder="First name" />
            <input value={lname} onChange={(e)=> setLname(e.target.value)} type="text" placeholder="Last name" />
            <button className="account_cart-btn btn" onClick={()=>editAccount(user.id)}>Update</button>
            </>
          }
            
          </div>

        </div>
        :
        <div className="account_container width_false">
          <h3>Account</h3>
          <hr />

          <div className="account_content-wrap">
            <div className="account_content">
              <h4>Please enter your email below to access or create your account</h4>
              <input type="email" placeholder="E-mail * "
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <p>Expected format: yourname@domain.com</p>
              {
                isOpen?
                <>
                  <input type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                  <p>No less than 8 symbols</p>
                </>
                :<></>
              }
              {
                isError?
                <span className="error">{error}</span>
                :<></>
              }
              <button className="btn" onClick={checkEmail}>Continue</button>
            </div>
          </div>
        </div>    
      }
    </>
  )
}

export default AccountPage