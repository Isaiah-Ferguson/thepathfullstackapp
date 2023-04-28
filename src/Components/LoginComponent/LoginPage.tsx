import React from 'react'
import { Form, Button, NavLink, ThemeProvider, Row,Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import { login, GetLoggedInUserData } from '../../DataServices/DataServices';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
// import CreatePage2 from './CreatePage';


export default function LoginComponent() {
  let navigate = useNavigate();
  const background = require("../../assets/jiujitsu.png");


    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        let userData = {
            Username : username,
            Password: password
        }
        console.log(userData);
        let token = await login(userData);
        if(token.token != null){
          localStorage.setItem("Token", token.token);
          await GetLoggedInUserData(username);
          navigate("/profileme");
        }
    }


  return (
    
    <Container>


    
    <Row  className='easy'>
    
    {/* Responsiveness continue! */}
    <Col lg={2} md={2}
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

      
      
      <Form className='formMe' style={{ position: 'relative', width: '503px', height: '579px', background: "rgba(255, 255, 255, 0.4)", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "54px auto 68px" }}>
        <h1 style={{ fontWeight: "700", fontSize: "96px", lineHeight: "116px", margin: "0" }}> The Path </h1>
        <p style={{ fontWeight: "700", fontSize: "32px", lineHeight: "39px" }}>A community driven Brazilian Jiu-Jitsu App</p>

        <Form.Control  
        style={{marginBottom: '10px', marginTop:'5px', background: 'FFFFFF', border: '1px solid #000000', borderRadius : '10px',  width: '432px'}}
        onChange={({ target: { value } }) =>  setUsername(value)} className='gugu' type="text" placeholder="Username" />


        <Form.Control 
        style={{marginBottom: '10px', marginTop:'5px', background: 'FFFFFF', border: '1px solid #000000', borderRadius : '10px',  width: '432px'}}
        onChange={(e) => setPassword(e.target.value)} className='gugu' type="password" placeholder="Password" />
        <div className='form-group form-buttons'>
          <NavLink href="/ForgotPass">Forgot <span> password?</span></NavLink>
          <NavLink href="/CreatePage2">Signup <span>here</span></NavLink>
          {/* <Link path "/Signup"/> */}
        </div>

        <div className='form-group'>
          <Button variant="info" onClick={handleSubmit} className='btn-pri'>Login</Button>



          {/* <Route path="/Route.tsx" element={<Route />} /> */}
          {/* <Route path="/" element={<Home />} /> */}



          {/* <li><Link to="/components/Signup">React</Link></li> */}
        </div>
      </Form>
   
    



</Col>


    </Row>
    
 

       </Container>


  )
  

   
  
}