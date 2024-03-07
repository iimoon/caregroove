const express = require("express");
const router = express.Router();
const AdminModel = require("../model/Admin");
const UserModel = require("../model/User")
const Blog = require('../model/AdminBlog'); // Adjust the path accordingly
const Post = require('../model/AdminPost'); // Import the Post model
const Booking = require('../model/Bookings');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const generateLogToken = require("../utils");
const therapistModel = require("../model/Therapist");

//Admin registration
router.post("/newadmin", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { fname, sname, email, password } = req.body;
    if (!fname || !sname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let oldUser = await AdminModel.findOne({ email });

    if (oldUser) {
      console.log("Existing user:", oldUser);
      return res.status(400).json({ error: "User exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    const newAdmin = new AdminModel({
      fname,
      sname,
      email,
      password: hashedpassword
    });
    await newAdmin.save();
    res.send("Admin account registered!");
  } catch (error) {
    console.error("Error saving admin record:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email must be unique" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (isPasswordValid) {
      res.status(200).json({
        _id: admin.id,
        fname: admin.fname,
        sname: admin.sname,
        email: admin.email,
        token: generateLogToken(admin),
        message: "Logged in Successfully",
        data: admin
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    console.log("Error during admin login:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 }); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Create a new post (for admin)



// Create a new post with an image
// router.post('/newpost', upload.single('image'), async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const imageType = req.file.mimetype;

//     // Save the image to the backend folder
//     const imagePath = path.join(__dirname, '../public/images/', req.file.originalname);
//     fs.writeFileSync(imagePath, req.file.buffer);

//     const post = new Post({ caption, image: req.file.originalname, imageType });
//     await post.save();

//     res.status(201).send(post);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error.message);
//   }
// });

// Get all posts
router.get('/viewposts', async (req, res) => {
  try {
    const posts = await Post.find();

    // Return image URLs instead of base64 data
    res.send(posts.map((post) => ({
      _id: post._id,
      caption: post.caption,
      imageURL: `./images/${post.image}`, // Assuming images are stored in 'public/images'
      createdBy: post.createdBy,
      createdAt: post.createdAt,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
//delete-post
// Delete a post by ID
router.delete('/deletepost/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//therapist
router.post('/addtherapist', async (req, res) => {
  try {
    console.log('Received data:', req.body);

    // Validate required fields
    const { fname, email, location, password } = req.body;
    if (!fname || !email || !location || !password) {
      return res.status(400).json({ message: 'Missing required fields: first name, email, location, and password are all mandatory.' });
    }

    // Check for existing therapist with the same email
    const existingTherapist = await therapistModel.findOne({ email });
    if (existingTherapist) {
      console.log('Existing therapist:', existingTherapist);
      return res.status(400).json({ error: 'Therapist exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create new therapist with hashed password
    const newTherapist = new therapistModel({
      fname,
      email,
      location,
      password: hashedPassword,
    });
    await newTherapist.save();

    res.status(201).json({ message: 'Therapist added successfully!' });
  } catch (error) {
    console.error('Error adding therapist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/viewtherapists', async (req, res) => {
  try {
    const therapist = await therapistModel.find();
    res.status(200).json(therapist);
  } catch (error) {
    console.log("Error getting therapists:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
router.delete("/deletetherapist/:id", async (req, res) => {
  try {
    const therapistId = req.params.id;
    const deletedtherapist = await therapistModel.findByIdAndDelete(therapistId);

    if (!deletedtherapist) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Therapist deleted successfully", data: deletedtherapist });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get('/bookings', async (req, res) => {
  try {
    // Retrieve booking details from the database and populate required fields
    const bookings = await Booking.find()
      .populate('userId', 'fname sname')
      .populate('therapistId', 'fname');

    // Send the bookings as a response
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Blog routes
//Get all blogs
router.get('/viewblogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//Post new blog
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

router.post('/addblog', upload.single('image'), async (req, res) => {
  // Access the uploaded image using req.file
  const { title, content, category } = req.body;

  try {
    // Create a new Blog instance
    const newBlog = new Blog({
      title,
      content,
      category,
      // If you're storing the file path in the database, you can access it using req.file.path
      imagePath: req.file.path // Assuming imagePath is the field in your Blog schema to store the image path
    });

    // Save the new blog to the database
    await newBlog.save();

    // Respond with the newly created blog
    res.json(newBlog);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// PUT (Update) a blog by ID
router.put('/updateblog/:blogId', async (req, res) => {
  const { title, content, category } = req.body;
  const blogId = req.params.blogId;

  console.log('Received update request for blogId:', blogId);
  console.log('Update data:', { title, content, category });

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content, category }, { new: true });

    if (!updatedBlog) {
      console.log('Blog not found with id:', blogId);
      return res.status(404).json({ error: 'Blog not found' });
    }

    console.log('Blog updated successfully:', updatedBlog);
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get blog w specific ID
router.get('/getblog/:blogId', async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// DELETE a blog by ID
router.delete('/blogs/:id', async (req, res) => {
  console.log("Server response:",res.body);
  const blogId = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
