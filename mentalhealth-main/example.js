<Route path='/user' element={<Navbar />}>
    <Route path='/user/login' element={<Login />} />
    <Route path='/user/register' element={<Register />} />
    <Route path='/user/about' element={<About />} />
</Route>