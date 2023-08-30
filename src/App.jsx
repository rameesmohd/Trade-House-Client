import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserRouter from './Routes/User'
import AdminRouter from './Routes/Admin'
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TutorRouter from './Routes/Tutor';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/admin/*' element={<AdminRouter/>}/>
            <Route path='/tutor/*' element={<TutorRouter/>}/>
            <Route path='/*' element={<UserRouter/>}/>
        </Routes>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    </BrowserRouter>
  )
}

export default App
