import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { Column, DataTable } from 'primereact/datatable'
import { peliculaService } from '../services/peliculaService'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { actorService } from '../services/actorService'
import { Pelicula } from '../domain/pelicula'

export function EditarPelicula(props) {
  const peliculaId = props.match.params.id
  const [pelicula, setPelicula] = useState({})
  const [actores, setActores] = useState([])
  const [nuevoPersonaje, setNuevoPersonaje] = useState({})
  const history = useHistory()
  
  function editarPelicula(atributo, valor) {
    const peliculaEditada = Pelicula.fromJSON(pelicula)
    peliculaEditada[atributo] = valor
    setPelicula(peliculaEditada)
  }

  function editarPersonaje(atributo, valor) {
    const personajeEditado = { ...nuevoPersonaje }
    personajeEditado[atributo] = valor
    setNuevoPersonaje(personajeEditado)
  }

  function crearPersonaje() {
    pelicula.agregarPersonaje({ ...nuevoPersonaje })
    setPelicula(Pelicula.fromJSON(pelicula))
    setNuevoPersonaje({roles: ''})
  }

  function eliminarPersonaje(pelicula, personaje) {
    pelicula.eliminarPersonaje(personaje)
    setPelicula(Pelicula.fromJSON(pelicula))
  }

  function eliminar(personaje) {
    return (<Button tooltip="Eliminar el personaje de la película" icon="pi pi-times" className="p-button-raised p-button-danger p-button-rounded" onClick={() => eliminarPersonaje(pelicula, personaje)} />)
  }

  async function guardarCambios() {
    peliculaService.actualizarPelicula(pelicula)
    history.push('/')
  }

  async function buscarActor(event) {
    setActores(await actorService.getActores(event.query))
  }

  useEffect(() => {
    const getPelicula = async function() {
      const pelicula = await peliculaService.getPelicula(peliculaId)
      setPelicula(pelicula)
    }
    getPelicula()
  }, [])

  const defaultButtonWidth = '9em'

  return (
    <div>
      <div className="titulo">Editar Película</div>

      <div className="section">
        <InputText value={pelicula.titulo} onChange={(e) => editarPelicula('titulo', e.target.value)} placeholder="Título de la película" style={{width: '50em'}} />
      </div>

      <div className="section">
        <InputTextarea rows={5} cols={30} autoResize value={pelicula.frase} onChange={(e) => editarPelicula('frase', e.target.value)} placeholder="Frase de promoción" style={{width: '50em'}} />
      </div>

      <div className="section">
        <InputNumber value={pelicula.anio} useGrouping={false} onChange={(e) => editarPelicula('anio', e.target.value)} placeholder="Año de estreno" style={{width: '10em'}} />
      </div>

      <DataTable value={pelicula.personajes}>
        <Column field="actor.nombreCompleto" header="Persona"></Column>
        <Column field="roles" header="Roles"></Column>
        <Column body={eliminar} style={{width: defaultButtonWidth}} />
      </DataTable>

      <div className="section-group">
        <AutoComplete value={nuevoPersonaje.actor} inputStyle={{width: '30em'}} placeholder="Seleccione un actor" suggestions={actores} completeMethod={buscarActor} field="nombreCompleto" onChange={(e) => editarPersonaje('actor', e.target.value)} />
        <InputText value={nuevoPersonaje.roles} onChange={(e) => editarPersonaje('roles', e.target.value)} placeholder="Roles" style={{width: '30em'}} />
        <Button icon="pi pi-plus" label="Agregar un personaje" className="p-button-primary p-button-outlined p-button-rounded" onClick={crearPersonaje}></Button>
      </div>

      <Button icon="pi pi-save" label="Guardar los cambios" className="p-button-primary p-button-outlined p-button-rounded" onClick={guardarCambios}></Button>    

    </div>
  )
}