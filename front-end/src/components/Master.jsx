import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Home from "./user/Home";
=======
import Home from './user/Home';
>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
import Login from "./gobal/Login";
import Register from "./gobal/Register";
import Rooms from "./user/Rooms";
import Reviews from "./user/Reviews";
import Bookings from "./user/Bookings";
import Help from "./user/Help";
import Contact from "./user/Contact";
import Admin from "./admin/Admin";
<<<<<<< HEAD
import ManageRooms from "./admin/ManageRooms";
// import ManageBookings from "./admin/ManageBookings";
// import ManageGuests from "./admin/ManageGuests";
// import ManageStaff from "./admin/ManageStaff";
// import ManageInvoices from "./admin/ManageInvoices";
// import ViewReports from "./admin/ViewReports";
// import Settings from "./admin/Settings";

const Master = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="manageRooms" element={<ManageRooms />} />
          {/* <Route path="manageBookings" element={<ManageBookings />} />
          <Route path="manageGuests" element={<ManageGuests />} />
          <Route path="manageStaff" element={<ManageStaff />} />
          <Route path="manageInvoices" element={<ManageInvoices />} />
          <Route path="viewReports" element={<ViewReports />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Master;
=======
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
>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
