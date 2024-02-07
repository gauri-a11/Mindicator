const express = require('express');
const router = express.Router();

// Define a route to get all ticket booking history
router.get('/m_indicator_uts', async (req, res) => {
  try {
    const m_indicator_uts = await m_indicator_uts.find();
    res.json(m_indicator_uts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define a route to get a specific ticket booking by ID
router.get('/m_indicator_uts/:id', getTicketBooking, (req, res) => {
  res.json(res.ticketBooking);
});

// Define a route to create a new ticket booking
router.post('/m_indicator_uts', async (req, res) => {
  const ticketBooking = new TicketBooking({
    sourceStation: req.body.sourceStation,
    destinationStation: req.body.destinationStation,
  });

  try {
    const newTicketBooking = await ticketBooking.save();
    res.status(201).json(newTicketBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Define a route to delete a specific ticket booking by ID
router.delete('/ticketBookings/:id', getTicketBooking, async (req, res) => {
  try {
    await res.ticketBooking.remove();
    res.json({ message: 'Ticket booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific ticket booking by ID
async function getTicketBooking(req, res, next) {
  try {
    ticketBooking = await TicketBooking.findById(req.params.id);
    if (ticketBooking == null) {
      return res.status(404).json({ message: 'Ticket booking not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.ticketBooking = ticketBooking;
  next();
}

module.exports = router;
