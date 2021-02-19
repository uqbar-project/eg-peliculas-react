import axios from 'axios'
import { Pelicula } from '../domain/pelicula'
import { SERVER_CONNECTION } from './constants'

class PeliculaService {

    async getPeliculas(filtroBusqueda) {
      if (filtroBusqueda && filtroBusqueda.trim()) {
        const peliculasJson = await axios.get(SERVER_CONNECTION + '/peliculas/' + filtroBusqueda)
        return peliculasJson.data.map((pelicula) => Pelicula.fromJSON(pelicula))
      }
    }

    async getPelicula(id) {
      const peliculaJson = await axios.get(SERVER_CONNECTION + '/pelicula/' + id)
      return Pelicula.fromJSON(peliculaJson.data)
    }

    async actualizarPelicula(pelicula) {
      await axios.put(SERVER_CONNECTION + '/pelicula/' + pelicula.id, pelicula)
    }

    async crearPelicula(pelicula) {
      await axios.post(SERVER_CONNECTION + '/pelicula', pelicula)
    }

    async eliminarPelicula(pelicula) {
      await axios.delete(SERVER_CONNECTION + '/pelicula/' + pelicula.id, { data: pelicula })
    }
}

export const peliculaService = new PeliculaService()