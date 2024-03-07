const express = require("express");
const cors = require("cors");
const connectDB = require("./model/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require('path');
const therapistRoutes = require("./routes/therapistRoutes");
connectDB();

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serving static files
app.use("/public", express.static(path.resolve(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/therapist",therapistRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});
