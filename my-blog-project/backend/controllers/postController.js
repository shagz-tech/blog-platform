const Post = require('../models/post');

// @desc    Sabhi posts fetch karo
// @route   GET /api/posts
const getPosts = async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = { status: 'published' };
    if (category && category !== 'Sabhi') filter.category = category;

    const posts = await Post.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Single post fetch karo
// @route   GET /api/posts/:id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post nahi mili!' });
    }

    // Views increment karo
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Nayi post banao
// @route   POST /api/posts
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, status } = req.body;

    const post = await Post.create({
      title,
      content,
      category,
      tags,
      status: status || 'draft',
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Post update karo
// @route   PUT /api/posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post nahi mili!' });
    }

    // Sirf author update kar sakta hai
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Aap yeh post update nahi kar sakte!' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Post delete karo
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post nahi mili!' });
    }

    // Sirf author delete kar sakta hai
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Aap yeh post delete nahi kar sakte!' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post delete ho gayi!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    User ki apni posts fetch karo
// @route   GET /api/posts/myposts
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost, getMyPosts };