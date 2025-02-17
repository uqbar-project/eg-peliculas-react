import axios from 'axios'
import { SERVER_CONNECTION } from './constants'

class ActorService {

    async getActores(filtroBusqueda: string) {
      const peliculasJson = await axios.get(SERVER_CONNECTION + '/actores/' + filtroBusqueda)
      return peliculasJson.data
    }

}

export const actorService = new ActorService()