const initialState = { tickets: [] };

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TICKETS_SUCCESS": // ✅ Fix the action type here
      return { ...state, tickets: action.payload };
    case "CREATE_TICKET_SUCCESS":
      return { ...state, tickets: [...state.tickets, action.payload] }; // ✅ Add new ticket to state
    default:
      return state;
  }
};
