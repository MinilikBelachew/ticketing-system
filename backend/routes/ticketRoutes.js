// const express = require('express');
// const { createTicket, getTickets, updateTicket } = require('../controllers/ticketController');
// const { authenticate } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authenticate, createTicket);
// router.get('/', authenticate, getTickets);
// router.put('/:id', authenticate, updateTicket);

// module.exports = router;
const express = require("express");
const {
  createTicket,
  getTickets,
  updateTicket,
} = require("../controllers/ticketController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.put("/:id", authenticate, updateTicket); // Admin updates ticket

module.exports = router;
