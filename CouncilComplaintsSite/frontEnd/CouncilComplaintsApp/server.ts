import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with the URL of your frontend application
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Example route
app.get('/api/staff-authentication', (req: Request, res: Response) => {
  res.json({ message: 'Staff authentication route' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:8000}`);
});
