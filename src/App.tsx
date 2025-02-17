import './App.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { PeliculasRouter } from './routes'

function App() {
  return (
    <div className="App">
      <PeliculasRouter />
    </div>
  )
}

export default App