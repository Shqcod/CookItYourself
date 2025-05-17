const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/recipes', recipeRoutes);

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Shqcod:ZpjyLolP2pXjhbgK@cookityourself.cxrtkgn.mongodb.net/CookItYourself?retryWrites=true&w=majority&appName=CookItYourself', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
