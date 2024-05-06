import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './Pages/Main';
import EventDetail from './Pages/EventDetail';
import MyBookings from './Pages/MyBookings';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SeatPicker from './Pages/SeatPicker';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/my_bookings' element={<MyBookings/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/seat' element={<SeatPicker/>}>
          <Route path=':eventId' element={<EventDetail/>}/>
        </Route>
        <Route path='/event' element={<EventDetail/>}>
          <Route path=':eventId' element={<EventDetail/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
