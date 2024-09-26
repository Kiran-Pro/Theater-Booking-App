import React from "react";
import { Booking } from "../DataTypes/types";
import { FaRegSadCry } from "react-icons/fa";

const Admin: React.FC<{
  bookings: Booking[];
  updateStatus: (
    index: number,
    status: "Pending" | "Approved" | "Rejected"
  ) => void;
}> = ({ bookings, updateStatus }) => {
  return (
    <div>
      <h1>Admin Bookings</h1>
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <FaRegSadCry size={60} color="#dc3545" />
          <p className="no-bookings-message">No bookings available.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Play Title</th>
              <th>Date</th>
              <th>Booked Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.userName}</td>
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
                  {booking.status === "Pending" && (
                    <>
                      <button
                        style={{ backgroundColor: "green", marginLeft: "10px" }}
                        onClick={() => updateStatus(index, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        style={{ backgroundColor: "red", marginLeft: "5px" }}
                        onClick={() => updateStatus(index, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
