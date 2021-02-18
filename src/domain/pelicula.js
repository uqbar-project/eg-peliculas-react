export class Pelicula {
  id = null
  titulo = ''
  frase = ''
  anio = 0
  personajes = []

  agregarPersonaje(personaje) {
    this.personajes.push(personaje)
  }

  eliminarPersonaje(personaje) {
    const index = this.personajes.indexOf(personaje)
    if (index > 0) {
      this.personajes.splice(index, 1)
    } else {
      throw new Error('El personaje no existe en la película')
    }
  }

  static fromJSON(data) {
    return Object.assign(new Pelicula(), data)
  }
}