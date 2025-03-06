const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const ticket = new Ticket({
      user: req.user.id,
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

exports.getTickets = async (req, res) => {
  try {
    console.log("User making request:", req.user);

    let tickets;
    if (req.user.role === "admin") {
      tickets = await Ticket.find();
    } else {
      tickets = await Ticket.find({ user: req.user.id });
    }

    console.log("Tickets found:", tickets);
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server Error: Cannot fetch tickets" });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    console.log(
      "Received update request for ticket:",
      req.params.id,
      "with data:",
      req.body
    );

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can update tickets" });
    }

    const { status, title, description } = req.body;
    if (status && typeof status !== "string") {
      return res.status(400).json({ message: "Status must be a string" });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

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
