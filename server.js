import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import galleryRoutes from './routes/gallery.js';
import contactRoutes from './routes/contact.js';

// Load environmental variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);

// Root test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'OTM Production Portfolio API is running...' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
