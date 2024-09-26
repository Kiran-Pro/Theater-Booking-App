export interface Play_details {
  id: number;
  title: string;
  date: string;
  time: string;
  image_path: string;
}

export interface Booking {
  play: Play_details;
  userName: string;
  status: "Pending" | "Approved" | "Rejected";
  bookedDate: string;
}
