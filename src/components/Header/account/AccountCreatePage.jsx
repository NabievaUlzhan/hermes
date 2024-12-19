import React, { useState, useContext } from "react";
import Header from "../Header";
import { addUser } from "../../../API/UsersService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/index";

const AccountCreatePage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  const { setIsAuth } = useContext(AuthContext)

  const users = useSelector(state =>state.usersReducer.users)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewUser = (event) => {
    let newUser = {
      email: email,
      password: password, 
      first_name: fname,
      last_name: lname
    }
    if(email && password.length >= 8 && fname && lname){
      // let count = 0
      // users.map(item=>{
      //   if(item.email == email){
      //     count++
          
      //   }
      // })
      // if(count == 0){
      //   dispatch(addUser(newUser))
      //   console.log(newUser)
      //   navigate('/')  
      // }
      dispatch(addUser(newUser))
      console.log(newUser)
      navigate('/account')  
      event.preventDefault()
      setIsAuth(false)
      localStorage.setItem('auth', 'true')
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }

  // const addNewReview = (rating, text, id) =>{
  //   const newReview = {
  //     item_id: id,
  //     name: 'Adam',
  //     rating: rating,
  //     date: new Date(),
  //     text: text
  //   }
  //   if(rating && text){
  //     dispatch(addReview(newReview))
  //   }
  // }

  return(
    <>
      <div className="account_header overflow">
        <Header></Header>
      </div>
      
      <div className="account_container overflow">
        <h3>Create an account</h3>
        <hr />

        <div className="account_content-wrap">
          <form className="account_content" onSubmit={addNewUser}>
            <h4>Login information</h4>
            <input type="email" placeholder="E-mail * "
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <p>Expected format: yourname@domain.com</p>
            <input type="password" placeholder="Password * "
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <p>No less than 8 symbols</p>
        
            <h4>Personal information</h4>
            <input type="text" placeholder="First name * "
              value={fname}
              onChange={(e)=> setFname(e.target.value)}
            />
            <input type="text" placeholder="Last name * "
              value={lname}
              onChange={(e)=> setLname(e.target.value)}
            />
            <input type="submit" value="Create an account" />
          </form>
        </div>
      </div>  
      
    </>
  )
}

export default AccountCreatePage