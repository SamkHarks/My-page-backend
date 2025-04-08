import express from 'express';
import { corsOptions } from '@/config/cors.js';
import router from '@/routes/index.js';
import cors from 'cors';
import { unknownEndpoint } from '@/middlewares/unknownEndPoint/unknownEndPoint.js';
import { logErrors } from '@/middlewares/logErrors/logErrors.js';
import { errorHandler } from '@/middlewares/errorHandler/errorHandler.js';
import { requestLogger } from '@/middlewares/requestLogger/requestLogger.js';


const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use(router);

// Middlewares after routes
app.use(unknownEndpoint);
app.use(logErrors);
app.use(errorHandler);

export default app;