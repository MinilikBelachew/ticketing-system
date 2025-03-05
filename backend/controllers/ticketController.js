// // controllers/ticketController.js
// const Ticket = require('../models/Ticket');

// // Create a new ticket
// exports.createTicket = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const ticket = new Ticket({ title, description, user: req.user.id });
//     await ticket.save();
//     res.status(201).json(ticket);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get tickets based on user role
// exports.getTickets = async (req, res) => {
//   try {
//     const tickets = req.user.role === 'admin' ? await Ticket.find() : await Ticket.find({ user: req.user.id });
//     res.status(200).json(tickets);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update ticket status (Admin only)
// exports.updateTicket = async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    
//     ticket.status = req.body.status;
//     await ticket.save();
//     res.status(200).json(ticket);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const Ticket = require("../models/Ticket");

// Create Ticket (User Only)
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const ticket = new Ticket({
      user: req.user.id, // ✅ Correct field name
      title,
      description,
      status: "Open",
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server Error: Cannot create ticket" });
  }
  console.log("User from token:", req.user);

};

// Get Tickets (User sees own, Admin sees all)
exports.getTickets = async (req, res) => {
  try {
    console.log("User making request:", req.user); // Debugging

    let tickets;
    if (req.user.role === "admin") {
      tickets = await Ticket.find(); // Admin gets all tickets
    } else {
      tickets = await Ticket.find({ user: req.user.id }); // Users get only their own tickets
    }

    console.log("Tickets found:", tickets); // Debugging
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server Error: Cannot fetch tickets" });
  }
};


// Update Ticket (Admin Only)
exports.updateTicket = async (req, res) => {
  try {
    console.log("Received update request for ticket:", req.params.id, "with data:", req.body);

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Only admins can update tickets" });
    }

    const { status, title, description } = req.body;
    if (status && typeof status !== "string") {
      return res.status(400).json({ message: "Status must be a string" });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update only provided fields
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (status) ticket.status = status;

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    console.error("❌ Error updating ticket:", error);
    res.status(500).json({ message: "Server Error: Cannot update ticket" });
  }
};