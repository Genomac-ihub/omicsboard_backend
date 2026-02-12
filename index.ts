import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/omicsboard';

// CORS Configuration - Allow credentials with specific origins
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow localhost on any port for development
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Omicsboard API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database Connection
mongoose.connect(MONGODB_URI, { family: 4 } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Hint: Check if your IP address is whitelisted in MongoDB Atlas Network Access.');
  });

export default app;
