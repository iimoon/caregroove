import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/userreg/Register';
import Adminlog from './Components/adminlog/Adminlog';
import Login from './Components/loginpage/Login';
import AdminPage from './Components/adminlog/AdminPage';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register-page' element={<Register />} />
            <Route path='/admin-login' element={<Adminlog />} />
            <Route path='login-page' element={<Login />} />
            <Route path='/adminpanel' element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </div>
  );
}

export default App;
