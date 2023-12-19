import React from 'react'

const Home = () => {
  return (
    <div>
        <div className="navbar">
            <div className="logo">
                <h2>CareGrove</h2>
            </div>
            <ul>
                <li><a href='{Home}'>Home</a></li>
                <li><a href='register-page'>register</a></li>
                <li><a href='{About}'>About</a></li>
                <li><a href='admin-login'>admin</a></li>
                <li><a href='login-page'>login</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Home