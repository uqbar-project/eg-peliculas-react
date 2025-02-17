import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { BuscarPeliculas } from './components/BuscarPeliculas'
import { EditarPelicula } from './components/EditarPelicula'

export const PeliculasRoutes = () => 
  <Routes>
    <Route path="/" element={<BuscarPeliculas/>} />
    <Route path="/crearPelicula" element={<EditarPelicula/>} />
    <Route path="/editarPelicula/:idPelicula" element={<EditarPelicula/>} />
  </Routes>

export const PeliculasRouter = () => 
    <Router>
      <PeliculasRoutes/>
    </Router>
