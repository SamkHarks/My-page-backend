import express from 'express';
import skillsRouter from './routes/skills/skills.js';
import contact from './routes/contact/contact.js';
import cors from 'cors';
import { unknownEndpoint } from './middlewares/unknownEndPoint/unknownEndPoint.js';import { logErrors } from './middlewares/logErrors/logErrors.js';
import { errorHandler } from './middlewares/errorHandler/errorHandler.js';


const app = express();

const corsOptions = {
  methods: ['GET', 'POST'], // Currently no other methods are supported
  origin: ['http://localhost:3000', 'https://samis-portfolio.onrender.com']
}

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/skills', skillsRouter);
app.use('/api/contact', contact);

// Middlewares after routes
app.use(unknownEndpoint);
app.use(logErrors);
app.use(errorHandler);


const PORT =  process.env['PORT'] || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});