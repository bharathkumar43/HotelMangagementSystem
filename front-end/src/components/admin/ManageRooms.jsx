import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManageRooms.css";

const ManageRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    price: "",
    pictureUrl: "",
    status: "Available",
  });
  const [editRoom, setEditRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added for error feedback

  // Fetch rooms with authentication
  const fetchRooms = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please log in to manage rooms.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:9099/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched rooms:", response.data);
      setRooms(response.data);
      setErrorMessage(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching rooms:", err);
      if (err.response && err.response.status === 401) {
        setErrorMessage("Unauthorized access. Redirecting to login...");
        navigate("/login");
      } else {
        setErrorMessage("Failed to fetch rooms. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [navigate]);

  // Add a new room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please log in to add a room.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:9099/api/rooms", newRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewRoom({
        roomNumber: "",
        roomType: "",
        capacity: "",
        price: "",
        pictureUrl: "",
        status: "Available",
      });
      fetchRooms(); // Refresh the room list
      setErrorMessage(""); // Clear any previous errors
    } catch (err) {
      console.error("Error adding room:", err);
      setErrorMessage("Failed to add room. Please try again.");
    }
  };

  // Update a room
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please log in to update a room.");
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://localhost:9099/api/rooms/${editRoom.id}`,
        editRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      setEditRoom(null);
      fetchRooms(); // Refresh the room list
      setErrorMessage(""); // Clear any previous errors
    } catch (err) {
      console.error("Error updating room:", err);
      setErrorMessage("Failed to update room. Please try again.");
    }
  };

  // Delete a room
  const handleDeleteRoom = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please log in to delete a room.");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:9099/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRooms(); // Refresh the room list
      setErrorMessage(""); // Clear any previous errors
    } catch (err) {
      console.error("Error deleting room:", err);
      setErrorMessage("Failed to delete room. Please try again.");
    }
  };

  // Open modal for editing a room
  const openModal = (room) => {
    setEditRoom(room);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditRoom(null);
  };

  return (
    <div className="manage-rooms-container">
      <h1>Manage Rooms</h1>

      {errorMessage && (
        <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
          {errorMessage}
        </div>
      )}

      <div className="add-room-form">
        <h2>Add New Room</h2>
        <form onSubmit={handleAddRoom}>
          <div className="form-field">
            <label>Room Number</label>
            <input
              type="text"
              value={newRoom.roomNumber}
              onChange={(e) =>
                setNewRoom({ ...newRoom, roomNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="form-field">
            <label>Room Type</label>
            <input
              type="text"
              value={newRoom.roomType}
              onChange={(e) =>
                setNewRoom({ ...newRoom, roomType: e.target.value })
              }
              required
            />
          </div>
          <div className="form-field">
            <label>Capacity</label>
            <input
              type="number"
              value={newRoom.capacity}
              onChange={(e) =>
                setNewRoom({ ...newRoom, capacity: e.target.value })
              }
              required
            />
          </div>
          <div className="form-field">
            <label>Price</label>
            <input
              type="number"
              value={newRoom.price}
              onChange={(e) =>
                setNewRoom({ ...newRoom, price: e.target.value })
              }
              required
            />
          </div>
          <div className="form-field">
            <label>Picture URL</label>
            <input
              type="text"
              value={newRoom.pictureUrl}
              onChange={(e) =>
                setNewRoom({ ...newRoom, pictureUrl: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Status</label>
            <select
              value={newRoom.status}
              onChange={(e) =>
                setNewRoom({ ...newRoom, status: e.target.value })
              }
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <button type="submit">Add Room</button>
        </form>
      </div>

      <div className="rooms-list">
        <h2>Existing Rooms</h2>
        {rooms.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          <ul>
            {rooms.map((room) => (
              <li key={room.id} className="room-item">
                <img
                  src={room.pictureUrl || "https://via.placeholder.com/150"}
                  alt={room.roomNumber}
                />
                <div>
                  <h3>{room.roomNumber}</h3>
                  <p>Type: {room.roomType}</p>
                  <p>Capacity: {room.capacity}</p>
                  <p>Price: ₹{room.price}</p>
                  <p>Status: {room.status}</p>
                </div>
                <div className="actions">
                  <button onClick={() => openModal(room)}>Edit</button>
                  <button onClick={() => handleDeleteRoom(room.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              ×
            </span>
            <h2>Edit Room</h2>
            <form onSubmit={handleUpdateRoom}>
              <div className="form-field">
                <label>Room Number</label>
                <input
                  type="text"
                  value={editRoom.roomNumber}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, roomNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label>Room Type</label>
                <input
                  type="text"
                  value={editRoom.roomType}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, roomType: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label>Capacity</label>
                <input
                  type="number"
                  value={editRoom.capacity}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, capacity: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label>Price</label>
                <input
                  type="number"
                  value={editRoom.price}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label>Picture URL</label>
                <input
                  type="text"
                  value={editRoom.pictureUrl}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, pictureUrl: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label>Status</label>
                <select
                  value={editRoom.status}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, status: e.target.value })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="submit">Update Room</button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;