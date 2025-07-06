import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// ✅ Tell Express to serve static files from /public
app.use(express.static('public'));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Homepage with form
app.get('/', (req, res) => {
  res.render('index');
});

// API logic route
app.get('/recipes', async (req, res) => {
  const { minCarbs, maxCarbs, number } = req.query;

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByNutrients', {
      params: {
        minCarbs,
        maxCarbs,
        number,
        apiKey: process.env.SPOONACULAR_API_KEY // Replace with your actual key
      }
    });

    res.render('result', { recipes: response.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to fetch recipes.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
