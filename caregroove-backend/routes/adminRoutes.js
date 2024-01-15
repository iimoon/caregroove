const express = require("express");
const router = express.Router();
const AdminModel = require("../model/Admin");
const UserModel = require("../model/User")
const Blog = require('../model/AdminBlog'); // Adjust the path accordingly
const Post = require('../model/AdminPost'); // Import the Post model
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
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image (jpg, jpeg, or png)'));
    }
    cb(undefined, true);
  },
});

// Create a new post with an image
router.post('/newpost', upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const imageType = req.file.mimetype;

    // Save the image to the backend folder
    const imagePath = path.join(__dirname, '../public/images/', req.file.originalname);
    fs.writeFileSync(imagePath, req.file.buffer);

    const post = new Post({ caption, image: req.file.originalname, imageType });
    await post.save();

    res.status(201).send(post);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// Get all posts
router.get('/viewposts', async (req, res) => {
  try {
    const posts = await Post.find();

    // Decode base64 images before sending
    posts.forEach((post) => {
      post.image = Buffer.from(post.image, 'base64');
      res.setHeader('Content-Type', post.imageType); // Set appropriate content type based on imageType
    });

    res.send(posts);
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
    const { fname, email, location } = req.body;
    if (!fname || !email || !location) {
      return res
        .status(400)
        .json({ message: 'Missing required fields: first name, email, and location are all mandatory.' });
    }

    // Check for existing therapist with the same email
    const existingTherapist = await therapistModel.findOne({ email });
    if (existingTherapist) {
      console.log('Existing therapist:', existingTherapist);
      return res.status(400).json({ error: 'Therapist exists' });
    }

    // Create new therapist
    const newTherapist = new therapistModel({
      fname,
      email,
      location,
    });
    await newTherapist.save();

    res.status(201).json({ message: 'Therapist added successfully!' });
  } catch (error) {
    console.error('Error adding therapist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/viewtherapists', async(req,res)=>{
  try{
    const therapist = await therapistModel.find();
    res.status(200).json(therapist);
  }catch(error){  
    console.log("Error getting therapists:",error);
    res.status(500).json({message:"Internal server error"});
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
router.post('/addblog', async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const newBlog = new Blog({ title, content, category });
    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// PUT (Update) a blog by ID
router.put('/blogs/:id', async (req, res) => {
  const { title, content, category } = req.body;
  const blogId = req.params.id;
  
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content, category }, { new: true });
    
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// DELETE a blog by ID
router.delete('/blogs/:id', async (req, res) => {
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
