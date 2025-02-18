import { Personaje } from "./personaje"

export class Pelicula {

  constructor(public id = null, public titulo = '', public frase = '', public anio: number | null = new Date().getFullYear(), public personajes: Personaje[] = []) {
  }

  agregarPersonaje(personaje: Personaje) {
    const errores: string[] = []
    validarCampo(personaje.actor, (actor) => !!actor && !!actor.id, "Debe ingresar actor para el personaje.", errores)
    validarCampo(personaje.roles, (roles) => !!roles, "Debe ingresar rol/es para el personaje.", errores)
    if (errores.length) throw errores
    this.personajes.push(personaje)
  }

  eliminarPersonaje(personaje: Personaje) {
    const index = this.findIndexPersonaje(personaje)
    if (index >= 0) {
      this.personajes.splice(index, 1)
    } else {
      throw new Error('El personaje no existe en la película')
    }
  }

  // Este método podría haber sido parte de una abstracción Personaje
  // por el momento lo dejamos así
  findIndexPersonaje(personaje: Personaje) {
    const fnCompararPersonaje = (_personaje: Personaje) => '' + (_personaje.actor?.id ?? 0) + _personaje.roles
    const personajes = this.personajes.map(fnCompararPersonaje)
    const personajeAComparar = fnCompararPersonaje(personaje)
    return personajes.indexOf(personajeAComparar)
  }

  validar() {
    const errores: string[] = []
    validarCampo(this.titulo, noVacio, "Debe ingresar título.", errores)
    validarCampo(this.frase, noVacio, "Debe ingresar frase.", errores)
    validarCampo(this.anio, (anio) => !!anio && anio > 1930, "Debe ingresar un año mayor a 1930.", errores)
    validarCampo<Personaje[]>(this.personajes, (personajes) => personajes.length > 0, "Debe ingresar personajes.", errores)
    validarCampo<Personaje[]>(this.personajes, (personajes) => personajes.every(personaje => !!personaje.roles), "Debe ingresar roles para todos los personajes.", errores)
    validarCampo<Personaje[]>(this.personajes, (personajes) => personajes.every(personaje => !!personaje.actor?.id), "Debe ingresar actores para todos los personajes.", errores)
    if (errores.length) throw errores
  }

  static fromJSON(data: unknown) {
    return Object.assign(new Pelicula(), data)
  }
}

const validarCampo = <T>(dato: T, validacion: (dato: T) => boolean, mensajeError: string, errores: string[]) => {
  if (!validacion(dato)) errores.push(mensajeError + ' ')
}

const noVacio = (dato: unknown) => !!dato