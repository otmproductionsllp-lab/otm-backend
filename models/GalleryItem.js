import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['photography', 'videography'],
      default: 'photography',
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    instagramUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;
