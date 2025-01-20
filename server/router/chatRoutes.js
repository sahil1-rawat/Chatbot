import express from 'express';
import { getMessages, sendMessages } from '../Controllers/chatController.js';

const chatRouter = express();
chatRouter.post('/messages', sendMessages);
chatRouter.get('/messages', getMessages);
export default chatRouter;
