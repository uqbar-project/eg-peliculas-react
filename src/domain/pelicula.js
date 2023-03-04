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
    const index = this.findIndexPersonaje(personaje)
    if (index >= 0) {
      this.personajes.splice(index, 1)
    } else {
      throw new Error('El personaje no existe en la película')
    }
  }

  // Este método podría haber sido parte de una abstracción Personaje
  // por el momento lo dejamos así
  findIndexPersonaje(personaje) {
    const fnCompararPersonaje = _personaje => '' + _personaje.actor.id + _personaje.roles
    const personajes = this.personajes.map(fnCompararPersonaje)
    const personajeAComparar = fnCompararPersonaje(personaje)
    return personajes.indexOf(personajeAComparar)
  }

  static fromJSON(data) {
    return Object.assign(new Pelicula(), data)
  }
}