import React from "react";
import { Booking } from "../DataTypes/types";
import { FaRegSadTear } from "react-icons/fa";

const UserBookings: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <FaRegSadTear size={60} color="#007bff" />
          <p className="no-bookings-message">No bookings found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Play Title</th>
              <th>Date</th>
              <th>Booked Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.play.title}</td>
                <td>{booking.play.date}</td>
                <td>{booking.bookedDate}</td>
                <td>
                  <span
                    style={{
                      color:
                        booking.status === "Approved"
                          ? "green"
                          : booking.status === "Rejected"
                          ? "red"
                          : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
