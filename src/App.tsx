import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileComponent from './Components/ProfileComponent/ProfileComponent';
import "./Components/ProfileComponent/ProfileComponent.css";
import "./Components/ModalComponent/ModulCSS.css";
import NavBar from "./Components/NavbarComponent/NavBarComponent"
import "./Components/NavbarComponent/NavBarComponent.css";
import "./Components/MainFeedComponent/MainFeedComponent.css";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MainFeedComponent from "./Components/MainFeedComponent/MainFeedComponent"
import Login from './Components/LoginComponent/LoginPage'
import './Components/LoginComponent/LoginPage'
import React from 'react';


// import { browserRouter } from ''
function App() {
  return (
    <BrowserRouter>
    {/* <Login/> */}
    {/* <div className='bgcolor'>
<NavBar/>
    </div> */}

    <Routes>
    <Route path='/' element={<Login/>}/>
{/* <Route path='/MainFeedComponent' element={<MainFeedComponent />}/> */}
{/* <Route path='/Dashboard' element={<Dashboard />}/> */}
</Routes>
    </BrowserRouter>
  );

}

export default App;
