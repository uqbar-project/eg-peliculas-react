import './App.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { PeliculasRoutes } from './routes'

function App() {
  return (
    <div className="App">
      <PeliculasRoutes />
    </div>
  )
}

export default App