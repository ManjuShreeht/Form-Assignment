
import Form from './components/Form';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UpdateForm from './components/UpdateForm';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />}/>
        <Route path='/items/:id' element={<UpdateForm />}  />
      </Routes>
      <ToastContainer />
      </BrowserRouter>
   
   
  );
}

export default App;
