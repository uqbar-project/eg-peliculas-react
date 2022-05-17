import { useState, useEffect, createRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { peliculaService } from '../services/peliculaService'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { actorService } from '../services/actorService'
import { Pelicula } from '../domain/pelicula'
import { Toast } from 'primereact/toast'

export function EditarPelicula() {
  const navigate = useNavigate()
  const { idPelicula } = useParams()
  const [pelicula, setPelicula] = useState({})
  const [actores, setActores] = useState([])
  const [nuevoPersonaje, setNuevoPersonaje] = useState({})
  const toast = createRef()
  const modoEdicion = !!idPelicula

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
    return <Button tooltip="Eliminar el personaje de la película" icon="pi pi-times" className="p-button-raised p-button-danger p-button-rounded" onClick={() => eliminarPersonaje(pelicula, personaje)} />
  }

  function cancelar() {
    navigate('/')
  }

  async function guardarCambios() {
    try {
      modoEdicion ? 
        await peliculaService.actualizarPelicula(pelicula) :
        await peliculaService.crearPelicula(pelicula)
      navigate('/')
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Error al actualizar los datos de la película', detail: e.message})
    }
  }

  async function buscarActor(event) {
    try {
      const actores = await actorService.getActores(event.query)
      setActores(actores)
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Error al buscar los actores', detail: e.message})
    }
  }

  useEffect(() => {
    const getPelicula = async function() {
      try {
        if (modoEdicion) {
          const pelicula = await peliculaService.getPelicula(idPelicula)
          setPelicula(pelicula)
        }
      } catch (e) {
        console.log(e)
        toast.current.show({severity: 'error', summary: 'Error al buscar la película', detail: e.message})
      }
    }
    getPelicula()
  }, [])

  const defaultButtonWidth = '9em'

  return (
    <div>
      <Toast ref={toast}/>
      <div className="titulo">Editar Película</div>

      <div className="section">
        <InputText value={pelicula.titulo} onChange={(e) => editarPelicula('titulo', e.target.value)} placeholder="Título de la película" style={{width: '50em'}} />
      </div>

      <div className="section">
        <InputTextarea rows={5} cols={30} autoResize value={pelicula.frase} onChange={(e) => editarPelicula('frase', e.target.value)} placeholder="Frase de promoción" style={{width: '50em'}} />
      </div>

      <div className="section">
        <InputNumber value={pelicula.anio} useGrouping={false} onChange={(e) => editarPelicula('anio', e.value)} placeholder="Año de estreno" style={{width: '10em'}} />
      </div>

      <DataTable value={pelicula.personajes}>
        <Column field="actor.nombreCompleto" header="Persona"></Column>
        <Column field="roles" header="Roles"></Column>
        <Column body={eliminar} style={{width: defaultButtonWidth}} />
      </DataTable>

      <div className="section-group">
        <AutoComplete value={nuevoPersonaje.actor} inputStyle={{width: '30em'}} placeholder="Seleccione un actor" suggestions={actores} completeMethod={buscarActor} field="nombreCompleto" onChange={(e) => editarPersonaje('actor', e.target.value)} />
        <InputText value={nuevoPersonaje.roles} onChange={(e) => editarPersonaje('roles', [e.target.value])} placeholder="Roles" style={{width: '30em'}} />
        <Button icon="pi pi-plus" label="Agregar un personaje" className="p-button-primary p-button-outlined p-button-rounded" onClick={crearPersonaje}></Button>
      </div>

      <div className="section-group">
        <Button icon="pi pi-save" label="Guardar los cambios" className="p-button-primary p-button-outlined p-button-rounded" onClick={guardarCambios}></Button>    
        <Button label="Cancelar" className="p-button-secondary p-button-outlined p-button-rounded" onClick={cancelar}></Button>
      </div>
    </div>
  )
}
