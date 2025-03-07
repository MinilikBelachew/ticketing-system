// import axios from "axios";

// // Fetch Tickets (User gets own, Admin gets all)
// export const fetchTickets = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("No authentication token found");
//       return;
//     }

//     const res = await axios.get("http://localhost:5000/api/tickets", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     dispatch({ type: "FETCH_TICKETS_SUCCESS", payload: res.data });
//   } catch (error) {
//     console.error("Error fetching tickets:", error.response?.data?.message || error.message);
//   }
// };


// // Create Ticket (User Only)
// export const createTicket = (ticketData) => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.post("http://localhost:5000/api/tickets", ticketData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     dispatch({ type: "CREATE_TICKET_SUCCESS", payload: res.data });
//   } catch (error) {
//     console.error("Error creating ticket:", error.response?.data?.message || error.message);
//   }
// };

// // Update Ticket (Admin Only)
// export const updateTicket = (ticketId, updateData) => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found, cannot update ticket");

//     console.log(`🔄 Sending update request for ticket ${ticketId}...`, updateData); // Debugging

//     const res = await axios.put(
//       `http://localhost:5000/api/tickets/${ticketId}`,
//       updateData, // ✅ Ensure correct format
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     console.log("✅ Update Response:", res.data); // Debugging
//     dispatch({ type: "UPDATE_TICKET_SUCCESS", payload: res.data });
//   } catch (error) {
//     console.error("❌ Error updating ticket:", error.response?.data?.message || error.message);
//   }
// };
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch Tickets (User gets own, Admin gets all)
export const fetchTickets = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const res = await axios.get(`${API_BASE_URL}/api/tickets`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "FETCH_TICKETS_SUCCESS", payload: res.data });
  } catch (error) {
    console.error("Error fetching tickets:", error.response?.data?.message || error.message);
  }
};

// Create Ticket (User Only)
export const createTicket = (ticketData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_BASE_URL}/api/tickets`, ticketData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "CREATE_TICKET_SUCCESS", payload: res.data });
  } catch (error) {
    console.error("Error creating ticket:", error.response?.data?.message || error.message);
  }
};

// Update Ticket (Admin Only)
export const updateTicket = (ticketId, updateData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found, cannot update ticket");

    const res = await axios.put(`${API_BASE_URL}/api/tickets/${ticketId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "UPDATE_TICKET_SUCCESS", payload: res.data });
  } catch (error) {
    console.error("Error updating ticket:", error.response?.data?.message || error.message);
  }
};
