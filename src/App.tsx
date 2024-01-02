
import { Register } from './components/Register'
import './index.css'
import axios from 'axios'

function App() {

  axios.defaults.baseURL = 'http://localhost/4000';
  axios.defaults.withCredentials = true;
  return (

    
   <div className=' bg-slate-400'>
      <Register />
   </div>
  )
}

export default App
