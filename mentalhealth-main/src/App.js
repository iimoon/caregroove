import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/userreg/Register';
import Adminlog from './Components/adminlog/Adminlog';
import Login from './Components/loginpage/Login';
import AdminPage from './Components/adminlog/AdminPage';
import AdminLayout from './Components/adminlog/AdminLayout';
import AdminPost from './Components/adminlog/AdminPost';
import AdminBlog from './Components/adminlog/AdminBlog';
import AdminBlogView from './Components/adminlog/AdminBlogView';
import AdminTherapists from './Components/adminlog/AdminTherapists';
import AdminBookings from './Components/adminlog/AdminBookings';
import AdminViewPost from './Components/adminlog/AdminViewPost';
import AdminAddtherapist from './Components/adminlog/AdminAddtherapist';
import Notfound from './Components/Notfound';
import Userlayout from './Components/User/Userlayout';
// import { NextUIProvider } from '@nextui-org/react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='/admin/users' element={<AdminPage />} />
            <Route path='/admin/posts' element={<AdminPost />} />
            <Route path='/admin/viewposts' element={<AdminViewPost/>}/>
            <Route path='/admin/blog' element={<AdminBlog />} />
            <Route path='/admin/blog/:id' element={<AdminBlog />} />
            <Route path='/admin/viewblog' element={<AdminBlogView/>}/>
            <Route path='/admin/bookings' element={<AdminBookings/>}/>
            <Route path='/admin/viewblogs' element={<AdminBlogView />} />
            <Route path='/admin/therapist' element={<AdminAddtherapist/>} />
            <Route path='/admin/viewtherapist' element={<AdminTherapists/>}/>
          </Route>
          <Route path='/user' element={<Userlayout/>}>

          </Route>
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Components/Home';
// import Register from './Components/userreg/Register';
// import Adminlog from './Components/adminlog/Adminlog';
// import Login from './Components/loginpage/Login';
// import AdminPage from './Components/adminlog/AdminPage';
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
