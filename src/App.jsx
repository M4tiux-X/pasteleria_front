import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Noticias'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Boleta from './pages/Boletas'
import UsuarioPerfiles from './pages/UsuarioPerfiles'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import './css/main.css'



function App() {

  return (
    <>
      <div className="wrapper">
      <Router>
        <Navbar/>
        <main>
        <Routes>
          <Route path='/' element={<Productos/>}></Route>
          <Route path='/nosotros' element={<Nosotros/>}></Route>
          <Route path='/blogs' element={<Blogs/>}></Route>
          <Route path='/carrito' element={<Carrito/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/boletas' element={<Boleta/>}></Route>
          <Route path='/usuarioperfiles' element={<UsuarioPerfiles/>}></Route>
          <Route path='/contacto' element={<Contacto/>}></Route>
        </Routes>
        </main>
      </Router>
      </div>
    </>
  )
}

export default App
