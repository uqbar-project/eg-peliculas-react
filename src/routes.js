import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { BuscarPeliculas } from './components/BuscarPeliculas'
import { EditarPelicula } from './components/EditarPelicula'

export const PeliculasRoutes = () => (
  <Router>
      <Switch>
          <Route exact path="/" component={BuscarPeliculas} />
          <Route path="/crearPelicula" component={EditarPelicula} />
          <Route path="/editarPelicula/:id" component={EditarPelicula} />
      </Switch>
  </Router>
)