const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the image as a Buffer
    required: true,
  },
  imageType: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: '  ', // Default value for posts created via admin panel
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual property to get the image URL
postSchema.virtual('imageURL').get(function () {
  return `/images/${this.image}`; // Assuming 'images' is the folder inside 'public'
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
