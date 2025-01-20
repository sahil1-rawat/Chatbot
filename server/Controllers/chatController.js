import { db } from '../DB/connection.js';
import { AllMessages } from '../utils/messages.js';

export const sendMessages = async (req, res) => {
  const { sender, message } = req.body;

  try {
    // Insert user message into the database
    await db.query('INSERT INTO messages (sender, message) VALUES ($1, $2)', [
      sender,
      message,
    ]);

    let botRes = 'I am not sure, I understand';

    // Loop through the predefined responses
    for (let i = 0; i < AllMessages.length; i++) {
      if (message.toLowerCase().includes(AllMessages[i].sender)) {
        botRes = AllMessages[i].bot;
        break;
      }
    }

    // Insert bot response into the database
    await db.query('INSERT INTO messages (sender, message) VALUES ($1, $2)', [
      'bot',
      botRes,
    ]);

    res.status(200).json({ response: botRes });
  } catch (err) {
    console.error('Error interacting with database:', err);
    res.status(500).send('Error processing messages');
  }
};

export const getMessages = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM messages ORDER BY created_at ASC'
    );
    res.status(200).json(result.rows); // Use `rows` to access the data in PostgreSQL
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).send('Error retrieving messages');
  }
};
