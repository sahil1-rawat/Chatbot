import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './router/chatRoutes.js';
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', chatRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
