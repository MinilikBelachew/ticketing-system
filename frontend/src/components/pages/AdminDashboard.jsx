
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Edit2, 
  Save, 
  TicketIcon, 
  CheckCircle, 
  AlertCircle, 
  MoreHorizontal 
} from 'lucide-react';
import { fetchTickets, updateTicket } from '../../redux/actions/ticketActions';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Closed: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const AdminDashboard = () => {
  const [editMode, setEditMode] = useState(null);
  const [editedTicket, setEditedTicket] = useState({});
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleEditClick = (ticket) => {
    setEditMode(ticket._id);
    setEditedTicket({ ...ticket });
  };

  const handleChange = (e, field) => {
    setEditedTicket(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateTicket(editedTicket._id, editedTicket));
      setEditMode(null);
      setError('');
    } catch (err) {
      setError('Failed to update ticket. Please try again.');
    }
  };

  const renderTicketContent = (ticket) => {
    if (editMode === ticket._id) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editedTicket.title}
              onChange={(e) => handleChange(e, "title")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editedTicket.description}
              onChange={(e) => handleChange(e, "description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={editedTicket.status}
              onChange={(e) => handleChange(e, "status")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="flex-1 flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(null)}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{ticket.title}</h4>
          <p className="text-gray-600 mt-1">{ticket.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <StatusBadge status={ticket.status} />
          <button
            onClick={() => handleEditClick(ticket)}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition duration-300 flex items-center"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Edit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <TicketIcon className="w-10 h-10 text-blue-600" />
            Admin Dashboard
          </h2>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 bg-gray-100 border-b border-gray-200 flex items-center">
            <MoreHorizontal className="w-6 h-6 text-gray-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Ticket Management</h3>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <TicketIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No tickets found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <div 
                  key={ticket._id} 
                  className="p-6 hover:bg-gray-50 transition duration-200"
                >
                  {renderTicketContent(ticket)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;