import { Outlet } from 'react-router'
import './App.css'
import MoviesPage from './assets/components/MoviesPage'

function App() {


  return (
    <>
    <Outlet/>
    <MoviesPage />
    </>
  )
}

export default App
