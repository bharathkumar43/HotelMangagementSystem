import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false); // Added for loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:9099/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched rooms:", response.data);
        if (response.data.length > 0) {
          console.log("First room's data:", response.data[0]);
        }
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          alert("Failed to fetch rooms. Please try again later.");
        }
      }
    };

    fetchRooms();
  }, [navigate]);

  const handleFilterChange = (type) => {
    console.log("Filter changed to:", type);
    setFilter(type);
  };

  const handleBookNow = (room) => {
    if (room.status !== "Available") {
      alert("This room is not available for booking.");
      return;
    }
    console.log("Selected room for booking:", room);
    setSelectedRoom(room);
  };

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Check-in date cannot be in the past.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after the check-in date.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalAmount = selectedRoom.price * diffDays;

      // Create booking
      const bookingResponse = await axios.post(
        "http://localhost:9099/api/bookings",
        {
          userId: parseInt(userId),
          roomId: selectedRoom.id,
          checkInDate: checkIn, // Already in YYYY-MM-DD format
          checkOutDate: checkOut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking response:", bookingResponse.data);

      // Update room status to "Booked"
      await axios.put(
        `http://localhost:9099/api/rooms/${selectedRoom.id}`,
        {
          ...selectedRoom,
          status: "Booked",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh rooms list
      const updatedRooms = await axios.get("http://localhost:9099/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(updatedRooms.data);

      // Initiate payment
      const paymentResponse = await axios.post(
        "http://localhost:9099/api/payment/create",
        {
          amount: totalAmount,
          currency: "INR",
        }
      );

      console.log("Payment response:", paymentResponse.data);

      if (paymentResponse.data.error) {
        throw new Error(paymentResponse.data.error);
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_YOUR_KEY_ID", // Replace with your Razorpay key
          amount: paymentResponse.data.amount,
          currency: paymentResponse.data.currency,
          name: "Grand Hotel",
          description: `Booking for Room ${selectedRoom.roomNumber}`,
          order_id: paymentResponse.data.id,
          handler: async function (response) {
            alert(
              `Payment successful! Payment ID: ${response.razorpay_payment_id}`
            );
            setSelectedRoom(null);
            setCheckIn("");
            setCheckOut("");
            navigate("/bookings"); // Redirect to bookings page after successful payment
          },
          prefill: {
            name: localStorage.getItem("username"),
            email: "user@example.com", // Replace with actual user email if available
            contact: "9999999999", // Replace with actual user contact if available
          },
          theme: {
            color: "#28a745",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          alert(`Payment failed: ${response.error.description}`);
        });
        rzp.open();
      };

      script.onerror = () => {
        throw new Error("Failed to load Razorpay SDK.");
      };
    } catch (error) {
      console.error("Booking or payment failed:", error);
      alert(
        `Failed to book the room or initiate payment: ${
          error.response?.data || error.message
        }`
      );
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    navigate("/login");
  };

  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    return room.roomType.toLowerCase() === filter.toLowerCase();
  });

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minCheckOut = tomorrow.toISOString().split("T")[0];

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h2>Available Rooms</h2>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("deluxe")}
          className={filter === "AC" ? "active" : ""}
        >
          AC
        </button>
        <button
          onClick={() => handleFilterChange("non-ac room")} // Updated to match roomType
          className={filter === "NON_AC" ? "active" : ""}
        >
          Non-AC Room
        </button>
        <button
          onClick={() => handleFilterChange("luxury room")} // Added for luxury rooms
          className={filter === "LUXURY" ? "active" : ""}
        >
          Luxury Room
        </button>
      </div>
      <div className="rooms-grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              <img
                src={
                  room.pictureUrl || "https://via.placeholder.com/150" // Fixed field name
                }
                alt="Room"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className="room-details">
                <h3>{room.roomNumber}</h3>
                <p>Type: {room.roomType}</p> {/* Fixed field name */}
                <p>Price: ₹{room.price}</p>
                <p>Status: {room.status}</p>
                <button
                  onClick={() => handleBookNow(room)}
                  disabled={room.status !== "Available"}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>

      {selectedRoom && (
        <div className="booking-modal">
          <div className="booking-container">
            <h3>Booking Room {selectedRoom.roomNumber}</h3>
            <label>Check-in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                console.log("Check-in date changed:", e.target.value);
                setCheckIn(e.target.value);
                // Reset check-out if it's before the new check-in
                const newCheckIn = new Date(e.target.value);
                const currentCheckOut = new Date(checkOut);
                if (currentCheckOut <= newCheckIn) {
                  setCheckOut("");
                }
              }}
              min={today}
              required
            />
            <label>Check-out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                console.log("Check-out date changed:", e.target.value);
                setCheckOut(e.target.value);
              }}
              min={
                checkIn
                  ? new Date(new Date(checkIn).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0]
                  : minCheckOut
              }
              required
            />
            <div className="modal-buttons">
              <button onClick={handleBooking} disabled={loading}>
                {loading ? "Processing..." : "Confirm"}
              </button>
              <button onClick={() => setSelectedRoom(null)} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;