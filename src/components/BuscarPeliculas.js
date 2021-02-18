import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Column, DataTable } from 'primereact/datatable'
import { peliculaService } from '../services/peliculaService'
import { InputText } from 'primereact/inputtext'

export function BuscarPeliculas() {
  const [peliculas, setPeliculas] = useState([])
  const [filtroBusqueda, setFiltroBusqueda] = useState('')
  const history = useHistory()
  
  function editar(pelicula) {
    return (<Button tooltip="Editar la película" icon="pi pi-chevron-right" className="p-button-raised p-button-info p-button-rounded" onClick={() => history.push(`pelicula/${pelicula.id}`)} />)
  }

  function eliminarPelicula(pelicula) {
    // TODO: llamar a peliculaService
  }

  function eliminar(pelicula) {
    return (<Button tooltip="Eliminar la película" icon="pi pi-times" className="p-button-raised p-button-danger p-button-rounded" onClick={() => eliminarPelicula(pelicula)} />)
  }

  useEffect(() => {
    const getPeliculas = async function() {
      const peliculas = await peliculaService.getPeliculas(filtroBusqueda)
      setPeliculas(peliculas)
    }
    getPeliculas()
  }, [filtroBusqueda])

  const defaultButtonWidth = '10em'

  return (
    <div>
      <div className="titulo">Películas</div>

      <InputText value={filtroBusqueda} onChange={(e) => setFiltroBusqueda(e.target.value)} placeholder="Ingrese un valor a buscar para el título de una película, por ejemplo 'Good'" style={{width: '40em'}} />

      <DataTable value={peliculas}>
        <Column field="titulo" header="Título"></Column>
        <Column field="frase" header="Persona"></Column>
        <Column field="anio" header="Año"></Column>
        <Column body={editar} style={{width: defaultButtonWidth}} />
        <Column body={eliminar} style={{width: defaultButtonWidth}} />
      </DataTable>
      <Button icon="pi pi-plus" label="Agregar una nueva película" className="p-button-primary p-button-outlined p-button-rounded" onClick={() => { history.push('/nuevaPelicula')}}></Button>
    </div>
  )
}