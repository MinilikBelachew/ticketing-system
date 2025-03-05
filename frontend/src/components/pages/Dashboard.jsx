// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { createTicket, fetchTickets } from "../../redux/actions/ticketActions";

// class UserDashboard extends Component {
//   state = {
//     title: "",
//     description: "",
//     error: "",
//   };

//   componentDidMount() {
//     this.props.fetchTickets();
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const { title, description } = this.state;

//     if (!title || !description) {
//       this.setState({ error: "Title and description are required!" });
//       return;
//     }

//     try {
//       await this.props.createTicket({ title, description });
//       this.setState({ title: "", description: "", error: "" }); // Clear form
//     } catch (error) {
//       this.setState({ error: "Failed to create ticket. Please try again." });
//     }
//   };

//   render() {
//     return (
//       <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-3xl font-bold mb-4 text-center">User Dashboard</h2>

//         {/* Create Ticket Form */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h3 className="text-lg font-semibold mb-3">Create a New Ticket</h3>
//           {this.state.error && <p className="text-red-500">{this.state.error}</p>}
//           <form onSubmit={this.handleSubmit}>
//             <input
//               type="text"
//               name="title"
//               value={this.state.title}
//               onChange={this.handleChange}
//               placeholder="Title"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <textarea
//               name="description"
//               value={this.state.description}
//               onChange={this.handleChange}
//               placeholder="Description"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
//               Submit Ticket
//             </button>
//           </form>
//         </div>

//         {/* Ticket List */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-3">My Tickets</h3>
//           {this.props.tickets.length === 0 ? (
//             <p>No tickets found.</p>
//           ) : (
//             <ul>
//               {this.props.tickets.map((ticket) => (
//                 <li key={ticket._id} className="border-b p-4">
//                   <h4 className="font-semibold">{ticket.title}</h4>
//                   <p>{ticket.description}</p>
//                   <p className="text-sm text-gray-500">Status: {ticket.status}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   tickets: state.tickets.tickets,
// });

// export default connect(mapStateToProps, { fetchTickets, createTicket })(UserDashboard);
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, TicketIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { createTicket, fetchTickets } from '../../redux/actions/ticketActions';

const TicketStatusBadge = ({ status }) => {
  const statusStyles = {
    open: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.open}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const UserDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await dispatch(createTicket({ title, description }));
      setTitle('');
      setDescription('');
      setError('');
    } catch (error) {
      setError('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <TicketIcon className="w-10 h-10 text-blue-600" />
            User Dashboard
          </h2>
        </div>

        {/* Ticket Creation Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <Plus className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Create New Ticket</h3>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ticket Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
                isSubmitting 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Create Ticket'}
            </button>
          </form>
        </div>

        {/* Ticket List */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">My Tickets</h3>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <TicketIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No tickets found. Create your first ticket!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <div 
                  key={ticket._id} 
                  className="py-4 hover:bg-gray-50 transition duration-200 rounded-lg px-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{ticket.title}</h4>
                      <p className="text-gray-600 mt-1">{ticket.description}</p>
                    </div>
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;