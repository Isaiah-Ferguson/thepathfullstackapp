import  React from 'react';
import { useState } from 'react'
import '../LoginComponent/LoginPage.css'
import { Form, NavLink, Col, Row, ThemeProvider } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { createAccount, login, GetPublishedBlogItem, GetLoggedInUserData } from '../../DataServices/DataServices'


// import Signup from '../components/Signup';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Signup  from "../components/Signup";
// import SignUp from '../signup/SignUp';
// import background from "../assets/jiujitsu.png";
const background = require("../../assets/jiujitsu.png");




// declare module './assets/jiujitsu.png';



function Login() {


    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Make function for button
    const handleSubmit = async () => {
        // We want our function to gather there username and password and with that data make api call
        // first we'll make an object then console log it
        let userData = {
          // structuring an object(opposite of destructuring) only works when they have the same variable
          username,
          password
      }
        
    
        console.log(userData);

        let token =  await login(userData);
        console.log(token)
        if(token.token != null){
            localStorage.setItem("Token", token.token);
           await GetLoggedInUserData(username);
           navigate("/MainFeedComponent/MainFeedComponent");
        }
        
    }

//   async function login(loginUser : string) {
//     console.log(loginUser);
//     const res = await fetch('https://thepathapi.azurewebsites.net/User/Login',{
//         method:"POST",
//         headers:{
//             'Content-Type':"application/json"
//         },
//         body:JSON.stringify(loginUser)
//     });
//     if(!res.ok){
//         const message = `An Error has Occured  ${res.status}`;
//         throw new Error(message);
//     }
//     const data = await res.json();
//     console.log(data);
//     //We are not writeing a return because this is a POST.
//     return data;
// }

  // let navigate = useNavigate();




  // function MainFeedNavigate() {
  //   navigate("/Signup");
    
  // };

  // function MainFeedNavigate4() {
  //   navigate("/Forgotpass");
  // };



  // const navigater = Navigate();

  // const navigateToContacts = () => {
  //   // 👇️ navigate to /contacts
  //   navigater('./Signup');
  // };
  // const showSignUp = () => {
  //   if(window.location.pathname === "/login"){
  //     return <SignUp/>


  //   }

  // } 
  return (

    <div id="container"
    className='blue-border'
    style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minWidth: "1145px",
      minHeight: "700px",
      borderTop: "10px solid rgba(220, 219, 252, 0.99)",
      borderLeft: "10px solid rgba(220, 219, 252, 0.99)",
      borderRight: "10px solid rgba(220, 219, 252, 0.99)",

    }}>






      <Form style={{ position: 'relative', width: '503px', height: '579px', background: "rgba(255, 255, 255, 0.4)", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "54px auto 68px" }}>
        <h1 style={{ fontWeight: "700", fontSize: "96px", lineHeight: "116px", margin: "0" }}> The Path </h1>
        <p style={{ fontWeight: "700", fontSize: "32px", lineHeight: "39px" }}>A community driven Brazilian Jiu-Jitsu App</p>

        <Form.Control  onChange={({target: {value}}) => setUsername(value)} id='input' type="text" placeholder="Username" />


        <Form.Control onChange={({target : {value}}) => setPassword(value)} type="password" placeholder="Password" />

        <div className='form-group form-buttons'>
          <NavLink >Forgot <span> password?</span></NavLink>
          <NavLink >Signup <span>here</span></NavLink>
          {/* <Link path "/Signup"/> */}
        </div>

        <div className='form-group'>

          <button onClick={handleSubmit} className='btn-pri'>Login</button>



          {/* <Route path="/Route.tsx" element={<Route />} /> */}
          {/* <Route path="/" element={<Home />} /> */}



          {/* <li><Link to="/components/Signup">React</Link></li> */}
        </div>
      </Form>




 

  </div>
  // </Container>

  );
}
export default Login;
