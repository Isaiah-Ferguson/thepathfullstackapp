import 'bootstrap/dist/css/bootstrap.min.css';
// import ProfileComponent from './Components/ProfileComponent/ProfileComponent';
import "./Components/ProfileComponent/ProfileComponent.css";
import "./Components/ModalComponent/ModulCSS.css";
import NavBar from "./Components/NavbarComponent/NavBarComponent"
import "./Components/NavbarComponent/NavBarComponent.css";
import "./Components/MainFeedComponent/MainFeedComponent.css";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import MainFeedComponent from "./Components/MainFeedComponent/MainFeedComponent"
// import Login from './Components/LoginComponent/LoginPage'
// import './Components/LoginComponent/LoginPage'
import React from 'react';
import LoginComponent from './Components/LoginComponent/LoginPage';
import CreatePage from './Components/LoginComponent/CreatePage';
import ProfileComponent from './Components/ProfileComponent/ProfileComponent';
import CreatePage2 from './Components/LoginComponent/CreatePage';
import ForgotPass from './Components/LoginComponent/ForgotPass';
import CreateAccount from './Components/CreateComponent/CreateAccount';
import ProfileEditModal from './Components/ModalComponent/ProfileEditModal';


// import { browserRouter } from ''
function App() {
  return (
    <BrowserRouter>
    {/* <Login/> */}
    {/* <div className='bgcolor'>
<NavBar/>
    </div> */}

    <Routes>
    {/* <Route path='/CreatePage' element={<CreatePage/>}/> */}
    {/* <Route path='/' element={<ProfileComponent />}/> */}
    
    <Route path='/' element={<LoginComponent />}/>
    <Route path='/ProfilePage' element={<ProfileComponent/>}/>
    <Route path ='/CreatePage2' element={<CreatePage2/>}/>
    <Route path ='/ForgotPass' element={<ForgotPass/>}/>
    <Route path ='/CreateAccount' element={<CreateAccount/>}/>
    
    <Route path ='/ProfileModal' element={<ProfileEditModal/>}/>

  

    </Routes>
    </BrowserRouter>
  );

}

export default App;
