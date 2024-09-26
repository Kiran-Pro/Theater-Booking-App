import React, { useEffect, useState } from "react";
import { Play_details } from "../DataTypes/types";
import "../style.css";

const UserPlays: React.FC<{
  onBook: (play: Play_details) => void;
  bookings: { play: Play_details; userName: string; status: string }[];
}> = ({ onBook, bookings }) => {
  const [playsData, setPlaysData] = useState<Play_details[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/playData.json");
      const data: Play_details[] = await response.json();
      setPlaysData(data);
    };
    fetchData();
  }, []);

  const isBooked = (playId: number) => {
    return bookings.some((booking) => booking.play.id === playId);
  };

  const handleBooking = (play: Play_details) => {
    if (!isBooked(play.id)) {
      onBook(play);
    }
  };

  return (
    <div className="ticket-container">
      <h1>Upcoming Plays</h1>
      <div className="plays-list">
        {playsData.map((play) => (
          <div key={play.id} className="play-card">
            <img
              src={play.image_path}
              alt={play.title}
              className="play-image"
            />
            <div className="play-info">
              <p className="play-title">{play.title}</p>
              <p className="play-date-time">{`${play.date} - ${play.time}`}</p>
              <button
                onClick={() => handleBooking(play)}
                disabled={isBooked(play.id)}
                style={{
                  backgroundColor: isBooked(play.id) ? "yellow" : "",
                  color: isBooked(play.id) ? "black" : "",
                }}
              >
                {isBooked(play.id) ? "Booked" : "Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPlays;
