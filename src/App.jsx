import { Outlet } from 'react-router'
import './App.css'
import Logo from './assets/components/formatted_svg/Logo'

function App() {


  return (
    <>
    <p className='figma-error-red'>Lorem ipsum dolor sit amet</p>
    <Logo/>
    <Outlet/>
    </>
  )
}

export default App
