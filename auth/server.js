import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import authRouter from './routes/auth.js';
import meRouter from './routes/me.js';
dotenv.config();

const app = express();
await connectDB();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true
}));

app.set('trust proxy', 1);

// app.use(session({
//   name: 'sid',
//   secret: process.env.SESSION_SECRET || 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   proxy: true,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URL,
//     ttl: 60 * 60 * 24 * 7
//   }),
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'none',
//     domain: '.example.com',
//     maxAge: 1000 * 60 * 60 * 24 * 7
//   }
// }));

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60 * 60 * 24 * 7
  }),
  cookie: {
    httpOnly: true,
    secure: false,      // must be false for localhost
    sameSite: 'lax',    // works for local cross-origin dev
    // domain: '.example.com', // remove for localhost
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));


// Auth routes
app.use('/api/auth', authRouter);
app.use('/api', meRouter);

app.listen(3000, () => console.log('Server running'));
