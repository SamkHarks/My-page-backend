import express from 'express';
import skillsRouter from './routes/skills.js';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/skills', skillsRouter);


const PORT =  process.env['PORT'] || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});