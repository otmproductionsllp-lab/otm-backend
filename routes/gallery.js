import express from 'express';
import GalleryItem from '../models/GalleryItem.js';

const router = express.Router();

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Public (Simplified for portfolio display, can add token auth later if desired)
router.post('/', async (req, res) => {
  try {
    const { title, category, thumbnailUrl, instagramUrl, videoUrl } = req.body;

    if (!title || !category || !thumbnailUrl || !instagramUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const item = new GalleryItem({
      title,
      category,
      thumbnailUrl,
      instagramUrl,
      videoUrl,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.deleteOne();
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

export default router;
