export class Pelicula {

  constructor() {
    this.id = null
    this.titulo = ''
    this.frase = ''
    this.anio = 0
    this.personajes = []
  }

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