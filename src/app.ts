import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/error/globalErrorHandler';
import { notFoundRoute } from './app/error/notFoundRoute';

// Create Express APP
const app: Application = express();

// List of allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://fs-client.vercel.app',
];

const corsOptionsDelegate = function (req: Request, callback: any) {
  const origin = req.header('Origin') as string;

  let corsOptions;
  if (allowedOrigins.indexOf(origin) !== -1) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

// Parser
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));

// Application Routes
app.use('/api', router);

// Create handler for GET request /
const getRootController = (req: Request, res: Response) => {
  // Send response text
  res.send('Hello Express JS!');
};

// Route handler for /
app.get('/', getRootController);

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route
app.use(notFoundRoute);

export default app;
