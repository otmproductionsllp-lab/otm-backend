import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import GalleryItem from './models/GalleryItem.js';

dotenv.config();

const initialItems = [
  {
    title: 'Video-23877',
    category: 'videography',
    thumbnailUrl: '/Video-23877.mp4',
    videoUrl: '/Video-23877.mp4',
    instagramUrl: '#',
  },
  {
    title: 'Video-86869',
    category: 'videography',
    thumbnailUrl: '/Video-86869.mp4',
    videoUrl: '/Video-86869.mp4',
    instagramUrl: '#',
  },
  {
    title: 'Video-52800',
    category: 'videography',
    thumbnailUrl: '/Video-52800.mp4',
    videoUrl: '/Video-52800.mp4',
    instagramUrl: '#',
  },
  {
    title: 'Ethereal Classical Dancers',
    category: 'photography',
    thumbnailUrl: '/dance.png',
    instagramUrl: 'https://www.instagram.com/otm__productions_/',
  },
  {
    title: 'Behind the Scenes',
    category: 'photography',
    thumbnailUrl: '/screenshot-2026-08-02-093523.png',
    instagramUrl: 'https://www.instagram.com/otm__productions_/',
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing
    await GalleryItem.deleteMany({});
    console.log('Existing gallery items cleared.');

    // Seed
    await GalleryItem.insertMany(initialItems);
    console.log('Database successfully seeded with initial gallery items!');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
