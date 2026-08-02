import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import ContactMessage from './models/ContactMessage.js';
import GalleryItem from './models/GalleryItem.js';

dotenv.config();

const verifyData = async () => {
  try {
    await connectDB();

    console.log('--- Checking Contact Inquiries in MongoDB ---');
    const contacts = await ContactMessage.find({}).sort({ createdAt: -1 });
    console.log(`Total messages found: ${contacts.length}`);
    contacts.forEach((msg, idx) => {
      console.log(`[${idx + 1}] Name: ${msg.name} | Email: ${msg.email} | Phone: ${msg.phone || 'N/A'}`);
      console.log(`    Message: "${msg.message}"`);
      console.log(`    Submitted: ${msg.createdAt}\n`);
    });

    console.log('--- Checking Gallery Items in MongoDB ---');
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    console.log(`Total items found: ${items.length}`);
    items.slice(0, 3).forEach((item, idx) => {
      console.log(`[${idx + 1}] Title: ${item.title} | Category: ${item.category}`);
      console.log(`    Instagram URL: ${item.instagramUrl}\n`);
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Verification error: ${error.message}`);
    process.exit(1);
  }
};

verifyData();
