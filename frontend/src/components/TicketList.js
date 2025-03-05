import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTickets } from "../redux/actions/ticketActions";

class TicketList extends Component {
  componentDidMount() {
    this.props.fetchTickets();
  }

  render() {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Tickets</h2>
        <ul>
          {this.props.tickets.map((ticket) => (
            <li key={ticket._id} className="border p-2 my-2">
              <span className="font-bold">{ticket.title}</span> - {ticket.status}
              <p>{ticket.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ tickets: state.tickets.tickets });
export default connect(mapStateToProps, { fetchTickets })(TicketList);
