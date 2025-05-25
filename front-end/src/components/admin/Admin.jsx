
import { NavLink,Link, Outlet } from "react-router-dom";
import "./Admin.css";

const admin = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <h1 className="admin-header">HOTEL MANAGEMENT DASHBOARD</h1>
        <ul className="admin-links">
          <li><NavLink to="manageRooms" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>Manage Rooms</NavLink></li>
          <li><Link to="manageBookings" className="admin-link">Manage Bookings</Link></li>
          <li><Link to="manageGuests" className="admin-link">Manage Guests</Link></li>
          <li><Link to="manageStaff" className="admin-link">Manage Staff</Link></li>
          <li><Link to="manageInvoices" className="admin-link">Manage Invoices</Link></li>
          <li><Link to="viewReports" className="admin-link">View Reports</Link></li>
          <li><Link to="settings" className="admin-link">Settings</Link></li>
          <li><Link to="/" className="admin-link logout">Logout</Link></li>
        </ul>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}


const Admin=()=>{
    return(
        <>
        <p>admin page</p>
        </>
    )
}

export default Admin;
