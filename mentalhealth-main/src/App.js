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
import Userhome from './Components/User/Userhome';
import UserJournal from './Components/User/UserJournal';
import UserDiary from './Components/User/UserDiary';
import UserDiaryView from './Components/User/UserDiaryView';
import UserMeditation from './Components/User/UserMeditation';
import AdminEditBlog from './Components/adminlog/AdminEditBlog';
import UserBlogs from './Components/User/UserBlogs';
import UserBlogRead from './Components/User/UserBlogRead';
import UserBookings from './Components/User/UserBookings';
import UserJournalread from './Components/User/UserJournalread';
import TherapistLayout from './Components/Therapist/TherapistLayout';
import TherapistHome from './Components/Therapist/TherapistHome';
import TherapistBookings from './Components/Therapist/TherapistBookings';
import TherapistJournal from './Components/Therapist/TherapistJournal';
import TherapistJournalView from './Components/Therapist/TherapistJournalView';
import TherapistJournalRead from './Components/Therapist/TherapistJournalRead';
import UserBookingDetails from './Components/User/UserBookingDetails';
import UserBookingHistory from './Components/User/UserBookingHistory';
import UserNotificationPage from './Components/User/UserNotificationPage';

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
            <Route path='/admin/editblog/:blogId' element={<AdminEditBlog/>}/>
            <Route path='/admin/therapist' element={<AdminAddtherapist/>} />
            <Route path='/admin/viewtherapist' element={<AdminTherapists/>}/>
          </Route>
          <Route path='/user' element={<Userlayout/>}>
            <Route path='/user/home' element={<Userhome/>}/>
            <Route path='/user/diary' element={<UserDiary/>}/>
            <Route path='/user/diary-entry' element={<UserJournal/>}/>
            <Route path='/user/diary-view' element={<UserDiaryView/>}/>
            <Route path='/user/meditation-home' element={<UserMeditation/>}/>
            <Route path='/user/blogs' element={<UserBlogs/>}/>
            <Route path="/user/blogread/:blogId" element={<UserBlogRead />} />
            <Route path="/user/bookings" element={<UserBookings/>}/>
            <Route path="/user/bookings/details/:therapistId" element={<UserBookingDetails/>}/>
            <Route path="/user/booked" element={<UserBookingHistory/>}/>
            <Route path="/user/readjournal/:diaryEntryId" element={<UserJournalread/>}/>
            <Route path="/user/notifications" element={<UserNotificationPage/>}/>
          </Route>
          <Route path='/therapist' element={<TherapistLayout/>}>
            <Route path='/therapist/home' element={<TherapistHome/>}/>
            <Route path='/therapist/bookings' element={<TherapistBookings/>}/>
            <Route path='/therapist/journal' element={<TherapistJournal/>}/>
            <Route path='/therapist/journal/view' element={<TherapistJournalView/>}/>
            <Route path='/therapist/journal/read/:diaryEntryId' element={<TherapistJournalRead/>}/>

          </Route>
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

