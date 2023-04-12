import React from 'react';
import './LoginPage.css';
import {  Form, NavLink} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import Signup from '../components/Signup';
// import { Link } from 'react-router-dom';
// import Signup  from "../components/Signup";
// import SignUp from '../signup/SignUp';
// import background from "../assets/jiujitsu.png";
const background = require("../../assets/jiujitsu.png")




// declare module './assets/jiujitsu.png';

function Forgotpass() {
  let navigate = useNavigate();

function MainFeedNavigate3() {
    navigate("/Signup");
  };
  
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
        
        
        // <Container className='form2'>
        
        
        
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


    
        <Form style={{ position: 'relative',width: '503px', height:'579px', background: "rgba(255, 255, 255, 0.4)", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "54px auto 68px"}}>
      <h1 style={{ fontWeight: "700", fontSize: "96px", lineHeight: "116px", margin: "0"}}> The Path </h1>
      <p style={{ fontWeight: "700", fontSize: "32px", lineHeight: "39px"}}>A community driven Brazilian Jiu-Jitsu App</p>
        
        <Form.Control id='input' type="email" placeholder="Email" />

        {/* <Form.Control type="password" placeholder="Password" />
        <Form.Control type="password" placeholder="Confirm Password" /> */}
        <div className='form-group form-buttons'>
          <NavLink >Forgot <span> password?</span></NavLink>
          <NavLink href="#">Signup <span>here</span></NavLink>
          {/* <Link path "/Signup"/> */}
        </div>

        <div className='form-group'>
          <button onClick={MainFeedNavigate3} className='btn-pri'>Login</button>
          
      
          {/* <Route path="/Route.tsx" element={<Route />} /> */}
          {/* <Route path="/" element={<Home />} /> */}


      
          {/* <li><Link to="/components/Signup">React</Link></li> */}
        </div>
        </Form>
      
    </div>
    // </Container>
    );
  }
  export default Forgotpass;
