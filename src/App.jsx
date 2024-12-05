import { Outlet } from 'react-router'
import './App.css'
import NavBar from "./assets/components/NavBar.jsx";

function App() {
  return (
    <>
    
      <div className="justify-self-center">
        <NavBar />
      </div>

      <Outlet />
    </>
  );
}

export default App;
