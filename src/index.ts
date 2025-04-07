import express from 'express';
import skillsRouter from './routes/skills.js';
import cors from 'cors';
import { unknownEndpoint } from './middlewares/unknownEndPoint/unknownEndPoint.js';


const app = express();

const corsOptions = {
  methods: ['GET'], // Currently no other methods are supported
  origin: ['http://localhost:3000', 'https://samis-portfolio.onrender.com']
}

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/skills', skillsRouter);

// After all routes middleware
app.use(unknownEndpoint);


const PORT =  process.env['PORT'] || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});