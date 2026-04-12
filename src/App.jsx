import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetail'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import { useState } from 'react'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageBooking from './pages/owner/ManageBooking'
import ManageCar from './pages/owner/MangeCar'
import Login from './components/Login'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  // Debug logging
  React.useEffect(() => {
    console.log("App showLogin state:", showLogin);
  }, [showLogin]);

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

    <Routes>
    <Route path='/' element={<Home />}/>
     <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
       <Route path='/my-bookings' element={<MyBookings/>}/>
    <Route path='/owner' element={<Layout />}> 
        <Route index element={<Dashboard/>}/>

        <Route path='add-car' element={<AddCar/>}/>
        <Route path='manage-cars' element={<ManageCar/>}/>
        <Route path='manage-bookings' element={<ManageBooking/>}/>
    </Route>

    </Routes>
    {!isOwnerPath && <Footer/>}
  



    </>
  )
}

export default App
