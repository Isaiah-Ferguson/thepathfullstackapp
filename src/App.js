import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileComponent from './Components/ProfileComponent/ProfileComponent.tsx';
import "./Components/ProfileComponent/ProfileComponent.css";
import "./Components/ModalComponent/ModulCSS.css";
import NavBar from "./Components/NavbarComponent/NavBarComponent.tsx"
import "./Components/NavbarComponent/NavBarComponent.css";
import "./Components/MainFeedComponent/MainFeedComponent.css";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MainFeedComponent from "./Components/MainFeedComponent/MainFeedComponent.tsx"
import React from 'react';
import Login from './Components/LoginPage/Loginpage.tsx'


// import { browserRouter } from ''
function App() {
  return (
    <div>
      {/* <Login/> */}
<NavBar/>
    </div>

    <Routes>
<Route path='/' element={<ProfileComponent />}/>
<Route path='/MainFeedComponent' element={<MainFeedComponent />}/>
{/* <Route path='/Dashboard' element={<Dashboard />}/> */}
</Routes>
    </BrowserRouter>
  );

}

export default App;
