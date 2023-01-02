import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/auth';
import AddStudent from './pages/AddStudent';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllStudents from './pages/DataBase';

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route exact path='/' element={<Auth/>}/>
      <Route path='/admin' element={<AddStudent/>}/>
      <Route path='/homepage' element={<AllStudents/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
