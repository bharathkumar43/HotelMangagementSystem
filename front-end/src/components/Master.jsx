import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './user/Home';
import Login from "./gobal/Login";
import Register from "./gobal/Register";
import Rooms from "./user/Rooms";
import Reviews from "./user/Reviews";
import Bookings from "./user/Bookings";
import Help from "./user/Help";
import Contact from "./user/Contact";
import Admin from "./admin/Admin";
const Master=()=>{
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/admin" element={<Admin></Admin>}></Route>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/rooms" element={<Rooms></Rooms>}></Route>
            <Route path="bookings" element={<Bookings></Bookings>}></Route>
            <Route path="reviews" element={<Reviews></Reviews>}></Route>
            <Route path="help" element={<Help></Help>}></Route>
            <Route path="contact" element={<Contact></Contact>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}
export default Master;