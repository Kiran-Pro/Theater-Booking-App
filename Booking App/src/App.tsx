import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserPlays from "./pages/UserPlay";
import Admin from "./pages/Admin";
import UserBookings from "./pages/UserBookings";
import { Play_details, Booking } from "./DataTypes/types";

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdminAuthenticated, setAdminAuthenticated] =
    useState<boolean>(false);

  const handleBook = (play: Play_details) => {
    const userName = prompt("Enter your name:") || "Guest";
    setBookings([
      ...bookings,
      {
        play,
        userName,
        status: "Pending",
        bookedDate: new Date().toLocaleDateString(),
      },
    ]);
  };

  const updateStatus = (
    index: number,
    status: "Pending" | "Approved" | "Rejected"
  ) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = status;
    setBookings(updatedBookings);
  };

  const handleAdminAccess = () => {
    const password = prompt("Enter the admin password:");
    if (password === "admin123") {
      setAdminAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">Plays</Link>
        <Link to="/user/bookings">My Bookings</Link>
        <Link to="/admin" onClick={handleAdminAccess}>
          Admin
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="home">
              <h1>Welcome to the Theater Booking App</h1>
            </div>
          }
        />
        <Route
          path="/user"
          element={<UserPlays onBook={handleBook} bookings={bookings} />}
        />
        <Route
          path="/user/bookings"
          element={<UserBookings bookings={bookings} />}
        />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <Admin bookings={bookings} updateStatus={updateStatus} />
            ) : (
              <h1>Please authenticate to access admin.</h1>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
