import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/userreg/Register';
import Adminlog from './Components/adminlog/Adminlog';
import Login from './Components/loginpage/Login';
import AdminPage from './Components/adminlog/AdminPage';
import ProtectedRoutes from './ProtectedRoutes';
import useAuth from './Components/hooks/useAuth';
// import { NextUIProvider } from '@nextui-org/react';

function App() {
  const [isAuth, login, logout] = useAuth(false)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register-page' element={<Register />} />
          <Route path='/admin-login' element={<Adminlog />} />
          <Route path='/login-page' element={<Login />} />
          <Route element ={ProtectedRoutes}>
            <Route path='/adminpage' element={<AdminPage/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './elements/Home';
// import Register from './elements/userreg/Register';
// import Adminlog from './elements/adminlog/Adminlog';
// import Login from './elements/loginpage/Login';
// import AdminPage from './elements/adminlog/AdminPage';
// // import { NextUIProvider } from '@nextui-org/react';

// function App() {
//   return (
//     <div className="App">
//         <BrowserRouter>
//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/register-page' element={<Register />} />
//             <Route path='/admin-login' element={<Adminlog />} />
//             <Route path='login-page' element={<Login />} />
//             <Route path='/adminpanel' element={<AdminPage />} />
//           </Routes>
//         </BrowserRouter>
//     </div>
//   );
// }

// export default App;
