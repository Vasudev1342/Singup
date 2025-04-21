const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
                              dbName: 'signupDB', // Explicitly set the database name
                              useNewUrlParser: true,
                              useUnifiedTopology: true,
                            }).then(() => {
                              console.log("MongoDB connected to signupDB");
                            }).catch((err) => {
                              console.error("Error connecting to MongoDB: ", err.message);
                            });
                            
// User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String
}));

// Routes
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
