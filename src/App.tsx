import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileComponent from './Components/ProfileComponent/ProfileComponent';
import "./Components/ProfileComponent/ProfileComponent.css";
import "./Components/ModalComponent/ModulCSS.css";
import NavBar from "./Components/NavbarComponent/NavBarComponent"
import LoginComponent from './Components/Login/LoginComponent';
import "./Components/NavbarComponent/NavBarComponent.css";
import "./Components/MainFeedComponent/MainFeedComponent.css";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MainFeedComponent from "./Components/MainFeedComponent/MainFeedComponent";
import React from 'react';
import CreateAccountComponent from './Components/Login/CreateAccountComponent';
import UserHooks from './Hooks/UserHooks';
import UserContext from "./UserContext/UserContext";

// import { browserRouter } from ''
function App() {

  const userHooks = UserHooks();

  return (
    <UserContext.Provider value={userHooks}>
    <BrowserRouter>
    <div className='bgcolor'>
<NavBar/>
    </div>

    <Routes>
<Route path='/' element={<ProfileComponent />}/>
<Route path='/MainFeedComponent' element={<MainFeedComponent />}/>
<Route path='/Login' element={<LoginComponent />}/>
<Route path='/Create' element={<CreateAccountComponent />}/>

</Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );

}

export default App;
