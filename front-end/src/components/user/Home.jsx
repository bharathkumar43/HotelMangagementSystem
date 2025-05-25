import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Home = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextButton = carouselRef.current.querySelector(".carousel-control-next");
        if (nextButton) nextButton.click();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
        {/* Offer Marquee */}
        <div className="scrollbar">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="15"
            style={{ backgroundColor: 'darkgreen', padding: '5px', fontSize: '1.5rem', color: 'white' }}
          >
            🌴 Summer Sale: Get 30% off on beach resorts! &nbsp;&nbsp;|&nbsp;&nbsp;
            🛏️ Book 3 nights, get the 4th night free! &nbsp;&nbsp;|&nbsp;&nbsp;
            🍽️ Free breakfast with every deluxe room booking! &nbsp;&nbsp;|&nbsp;&nbsp;
            🚗 Free airport pickup! &nbsp;&nbsp;|&nbsp;&nbsp;
            Book now <button style={{ backgroundColor: 'black', color: 'white' }}>book</button>
          </marquee>
        </div>

        {/* Header */}
        <div className="header">
          <span className="logo-img">
            <img
              src="https://assets.simplotel.com/simplotel/image/upload/x_0,y_0,w_367,h_134,r_0,c_crop,q_90/the-manohar-hyderabad/logo_white_kxpw3b"
              alt="Hotel Logo"
              className="hotel-logo"
            />
          </span>
          <nav className="navbar">
            <ul className="navbar-links">
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/bookings">Bookings</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/help">Help</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li>
                <div className="user-logo-container">
                  <i className="fas fa-user user-logo"></i>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Booking Section */}
        <div className="main">
          <div className="booking-section">
            <div className="booking-container">
              <div className="booking-field">
                <label>Check In</label>
                <div className="input-wrapper"><input type="date" /></div>
              </div>

              <div className="booking-field">
                <label>Check Out</label>
                <div className="input-wrapper"><input type="date" /></div>
              </div>

              <div className="booking-field">
                <label>Adults</label>
                <div className="input-wrapper">
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>

              <div className="booking-field">
                <label>Children</label>
                <div className="input-wrapper">
                  <select>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </div>
              </div>

              <div className="booking-field">
                <label>Promo Code</label>
                <div className="input-wrapper"><input type="text" placeholder="Enter Code" /></div>
              </div>

              <div className="price-info">
                <span>From <strong>3,168</strong> INR/Night</span>
              </div>
              <button className="book-now-button">BOOK NOW</button>
            </div>
          </div>

          {/* Room Showcase */}
          <div className="hotel-showcase">
            <h2>Our Rooms & Suites</h2>
            <div className="rooms-categories">
              {[
                {
                  title: "Luxury Room",
                  img: "https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg",
                  desc: "Our Luxury Rooms offer the perfect blend of comfort and sophistication. Equipped with premium amenities, enjoy spacious interiors and a relaxing atmosphere."
                },
                {
                  title: "AC Room",
                  img: "https://media-cdn.tripadvisor.com/media/photo-s/0d/06/a8/f7/super-deluxe-ac-room.jpg",
                  desc: "Enjoy the comfort of a well-furnished AC Room with a peaceful ambiance. Our AC rooms are designed to provide a restful environment, perfect for a serene stay."
                },
                {
                  title: "Non-AC Room",
                  img: "https://5.imimg.com/data5/JW/GD/MY-20459477/non-ac-rooms-500x500.jpg",
                  desc: "For budget-conscious travelers, our Non-AC Rooms offer comfort and quality at an affordable price. These rooms provide a simple yet relaxing experience."
                },
                {
                  title: "Deluxe Room",
                  img: "https://www.thelalit.com/wp-content/uploads/2024/10/DeluxeRoom-A.jpg",
                  desc: "Spacious and elegant, our Deluxe Rooms offer premium furnishings, a work desk, and a luxurious bathroom."
                },
                {
                  title: "Non-AC Room",
                  img: "https://pathanjalipuri.com/sites/default/files/avprooms/avp-deluxe-room1.jpg",
                  desc: "Economical and cozy, ideal for budget travelers. Equipped with essential amenities for a pleasant stay."
                },
                {
                  title: "Executive Suite",
                  img: "https://www.peninsula.com/en/-/media/images/new-york/03roomssuites/2024-refurbishment-rooms-and-suites/new-york_executive-suite_living-room-2.jpg?mw=905&hash=DF393D72B00D1DDC7BF4EB22128E0FE7",
                  desc: "Designed for business travelers or families, our Executive Suites provide spacious living areas with premium facilities, ensuring a pleasant stay."
                }
              ].map((room, i) => (
                <div className="room-category" key={i}>
                  <img src={room.img} alt={room.title} className="room-image" />
                  <h3>{room.title}</h3>
                  <p>{room.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="amenities">
            <h3>Hotel Amenities</h3>
            <div className="amenities-list">
              {[
                { icon: "wifi", label: "Free Wi-Fi" },
                { icon: "swimmer", label: "Swimming Pool" },
                { icon: "dumbbell", label: "Fitness Center" },
                { icon: "concierge-bell", label: "Room Service" },
                { icon: "spa", label: "Spa & Wellness" },
                { icon: "utensils", label: "Restaurant" },
                { icon: "umbrella-beach", label: "Beach Access" },
                { icon: "parking", label: "Free Parking" }
              ].map((amenity, i) => (
                <div className="amenity" key={i}>
                  <i className={`fas fa-${amenity.icon}`}></i><br />
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="about-hotel">
            <h2>About Our Hotel</h2>
            <p>
              Welcome to <strong>The Grand Stay</strong>, your home away from home. We provide luxurious and comfortable accommodation, excellent service, and world-class amenities to make your stay memorable.
            </p>
            <p>
              Our hotel features modern amenities, including a rooftop pool, a fitness center, a luxurious spa, and a variety of dining options. We also offer event spaces for conferences and weddings.
            </p>
          </div>

          {/* Footer */}
          <div className="footer-content">
            <div className="footer-section about">
              <h3>About Us</h3>
              <p>Welcome to Manohar Grand Hotel — where luxury meets comfort! Experience world-class hospitality, exceptional amenities, and memorable stays, right in the heart of the city.</p>
            </div>

            <div className="footer-section links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/rooms">Rooms & Suites</Link></li>
                <li><Link to="/offers">Special Offers</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/reviews">Guest Reviews</Link></li>
              </ul>
            </div>

            <div className="footer-section contact">
              <h3>Contact Us</h3>
              <p><i className="fas fa-map-marker-alt"></i> 123 Grand Street, Hyderabad, India</p>
              <p><i className="fas fa-phone"></i> +91 98765 43210</p>
              <p><i className="fas fa-envelope"></i> info@manohargrandhotel.com</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Manohar Grand Hotel | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
