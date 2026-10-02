import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import taskRoute from './routes/taskRoutes.js';

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
const mongoUri = process.env.MONGODB_URI;

//allow requests from frontend domain
const allowedOrigins = new Set(
  process.env.ALLOWED_ORIGINS
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? []
);

// Security headers
app.use(helmet());

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.has(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Connect to MongoDB database
try {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB Atlas");
} catch (error) {
  console.error("Error connecting to MongoDB Atlas:", error);
}

app.use(json());
app.use(urlencoded({extended:true}));

app.use('/api/todos', taskRoute);

app.listen(port,()=>{
    console.log(`Server started and running on port ${port}`);
})