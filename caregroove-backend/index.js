const express = require("express");
const cors = require("cors");
const connectDB = require("./model/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
connectDB();

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  console.log(req.body);
  res.send("hi");
});

app.use("/user",userRoutes);
app.use("/admin",adminRoutes);

app.listen(PORT, () => {
  console.log(`App running in PORT:${PORT}`);
});
