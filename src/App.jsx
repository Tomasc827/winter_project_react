import { Outlet } from 'react-router'
import './App.css'
import Trending from  './assets/components/Trending.jsx'
import Logo from './assets/components/formatted_svg/Logo'

function App() {


  return (
    <>
    <Trending/>
    <Outlet/>
    </>
  )
}

export default App
