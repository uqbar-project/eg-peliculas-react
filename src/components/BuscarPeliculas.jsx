import { useState, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { peliculaService } from 'src/services/peliculaService'
import { getErrorMessage } from './errorHandling'

export function BuscarPeliculas() {
  const [peliculas, setPeliculas] = useState([])
  const [filtroBusqueda, setFiltroBusqueda] = useState('')
  const navigate = useNavigate()
  const toast = createRef()
  
  function editar(pelicula) {
    return <Button tooltip="Editar la película" icon="pi pi-chevron-right" className="p-button-raised p-button-info p-button-rounded" onClick={() => navigate(`editarPelicula/${pelicula.id}`)} />
  }

  async function eliminarPelicula(pelicula) {
    try {
      await peliculaService.eliminarPelicula(pelicula)
      toast.current.show({ severity: 'success', summary: 'La película fue eliminada correctamente' })
      const peliculasNuevas = peliculas.filter((peliculaAFiltrar) => peliculaAFiltrar.id != pelicula.id)
      setPeliculas([...peliculasNuevas])
    } catch (e) {
      toast.current.show({severity: 'error', summary: 'Error al eliminar la película', detail: getErrorMessage(e)})
    }
}

  function eliminar(pelicula) {
    return <Button tooltip="Eliminar la película" icon="pi pi-times" className="p-button-raised p-button-danger p-button-rounded" onClick={() => eliminarPelicula(pelicula)} />
  }

  const getPeliculas = async (nuevoFiltroBusqueda) => {
    try {
      setFiltroBusqueda(nuevoFiltroBusqueda)
      const peliculas = await peliculaService.getPeliculas(filtroBusqueda)
      setPeliculas(peliculas)
    } catch (e) {
      toast.current.show({severity: 'error', summary: 'Error al buscar las películas', detail: getErrorMessage(e)})
    }
  }

  const defaultButtonWidth = '10em'

  return (
    <div>
      <Toast ref={toast}/>
      <div className="titulo">Películas</div>

      <InputText value={filtroBusqueda} onChange={(e) => getPeliculas(e.target.value)} placeholder="Ingrese un valor a buscar para el título de una película, por ejemplo 'Good'" style={{width: '40em'}} />

      <DataTable value={peliculas}>
        <Column field="titulo" style={{width: '25%'}} header="Título"></Column>
        <Column field="frase" header="Frase"></Column>
        <Column field="anio" style={{width: defaultButtonWidth}} header="Año"></Column>
        <Column body={editar} style={{width: defaultButtonWidth}} ></Column>
        <Column body={eliminar} style={{width: defaultButtonWidth}}></Column>
      </DataTable>
      <Button icon="pi pi-plus" label="Agregar una nueva película" className="p-button-primary p-button-outlined p-button-rounded" onClick={() => { navigate('/crearPelicula')}}></Button>
    </div>
  )
}