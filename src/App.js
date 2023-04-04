import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileComponent from './Components/ProfileComponent/ProfileComponent.tsx';
import "./Components/ProfileComponent/ProfileComponent.css";
import "./Components/ModalComponent/ModulCSS.css";
import NavBar from "./Components/NavbarComponent/NavBarComponent.tsx"
import "./Components/NavbarComponent/NavBarComponent.css";
import "./Components/MainFeedComponent/MainFeedComponent.css";
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MainFeedComponent from "./Components/MainFeedComponent/MainFeedComponent.tsx"
import React from 'react';


// import { browserRouter } from ''
function App() {
  return (
    <div>
<NavBar/>
<ProfileComponent/>
{/* <MainFeedComponent/> */}
    </div>
  );
}

export default App;
