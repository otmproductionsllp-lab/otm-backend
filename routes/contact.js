import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// @desc    Submit a contact inquiry
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', data: savedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Public
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

export default router;
