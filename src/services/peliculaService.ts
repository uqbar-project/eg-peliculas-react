import axios from 'axios'
import { SERVER_CONNECTION } from './constants'
import { Pelicula } from '../domain/pelicula'

class PeliculaService {

    async getPeliculas(filtroBusqueda: string) {
      if (filtroBusqueda && filtroBusqueda.trim()) {
        const peliculasJson = await axios.get(SERVER_CONNECTION + '/peliculas/' + filtroBusqueda)
        return peliculasJson.data.map((pelicula: Pelicula) => Pelicula.fromJSON(pelicula))
      } else return []
    }

    async getPelicula(id: string) {
      const peliculaJson = await axios.get(SERVER_CONNECTION + '/pelicula/' + id)
      return Pelicula.fromJSON(peliculaJson.data)
    }

    async actualizarPelicula(pelicula: Pelicula) {
      await axios.put(SERVER_CONNECTION + '/pelicula/' + pelicula.id, pelicula)
    }

    async crearPelicula(pelicula: Pelicula) {
      await axios.post(SERVER_CONNECTION + '/pelicula', pelicula)
    }

    async eliminarPelicula(pelicula: Pelicula) {
      await axios.delete(SERVER_CONNECTION + '/pelicula/' + pelicula.id, { data: pelicula })
    }
}

export const peliculaService = new PeliculaService()