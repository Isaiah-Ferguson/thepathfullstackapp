import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileComponent from './Components/ProfileComponent/ProfileComponent';
import "./Components/ProfileComponent/ProfileComponent.css";
import "./Components/ModalComponent/ModulCSS.css";
import LoginComponent from './Components/Login/LoginComponent';
import "./Components/NavbarComponent/NavBarComponent.css";
import "./Components/MainFeedComponent/MainFeedComponent.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainFeedComponent from "./Components/MainFeedComponent/MainFeedComponent";
import React, { useEffect } from 'react';
import CreateAccountComponent from './Components/Login/CreateAccountComponent';
import UserHooks from './Hooks/UserHooks';
import UserContext from "./UserContext/UserContext";
import ProfileFriend from './Components/ProfileComponent/ProfileFriend';
import './Components/Login/LoginComponent.css';
import ForgotPasswordComponent from './Components/Login/ForgotPasswordComponent';
import './Components/ProfileComponent/Loading.css';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = '#e4e5f9';
  }, [])

  return (
    <UserContext.Provider value={UserHooks()}>
    <BrowserRouter>


    <Routes>
<Route path='/profile' element={<ProfileComponent />}/>
<Route path='/MainFeedComponent' element={<MainFeedComponent />}/>
<Route path='/' element={<LoginComponent />}/>
<Route path='/Create' element={<CreateAccountComponent />}/>
<Route path='/friends' element={<ProfileFriend />}/>
<Route path='/ForgotPasswordComponent' element={<ForgotPasswordComponent/>}/>
</Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );

}

export default App;
