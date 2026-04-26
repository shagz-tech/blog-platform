const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes — login zaroori hai
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/user/myposts', protect, getMyPosts);

module.exports = router;