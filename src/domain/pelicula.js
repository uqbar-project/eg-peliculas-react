export class Pelicula {

  constructor() {
    this.id = null
    this.titulo = ''
    this.frase = ''
    this.anio = new Date().getFullYear()
    this.personajes = []
  }

  agregarPersonaje(personaje) {
    const errores = []
    validarCampo(personaje.actor, (actor) => !!actor && !!actor.id, "Debe ingresar actor para el personaje.", errores)
    validarCampo(personaje.roles, (roles) => !!roles, "Debe ingresar rol/es para el personaje.", errores)
    if (errores.length) throw errores
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

  validar() {
    const errores = []
    validarCampo(this.titulo, noVacio, "Debe ingresar título.", errores)
    validarCampo(this.frase, noVacio, "Debe ingresar frase.", errores)
    validarCampo(this.anio, (anio) => !!anio && anio > 1930, "Debe ingresar un año mayor a 1930.", errores)
    validarCampo(this.personajes, (personajes) => personajes.length, "Debe ingresar personajes.", errores)
    validarCampo(this.personajes, (personajes) => personajes.every(personaje => !!personaje.roles), "Debe ingresar roles para todos los personajes.", errores)
    validarCampo(this.personajes, (personajes) => personajes.every(personaje => !!personaje.actor.id), "Debe ingresar actores para todos los personajes.", errores)
    if (errores.length) throw errores
  }

  static fromJSON(data) {
    return Object.assign(new Pelicula(), data)
  }
}

const validarCampo = (dato, validacion, mensajeError, errores) => {
  if (!validacion(dato)) errores.push(mensajeError + ' ')
}

const noVacio = (dato) => !!dato