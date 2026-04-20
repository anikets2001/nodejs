import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import notesRouter from './routes/notes.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/notes', notesRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function startServer() {
  try {
    await connectDB();
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
}

startServer();
