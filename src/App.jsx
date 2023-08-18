import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserRouter from './Routes/User'
import AdminRouter from './Routes/Admin'


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/admin/*' element={<AdminRouter/>}/>
            <Route path='/*' element={<UserRouter/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
