import { db } from '../DB/connection.js';
import { AllMessages } from '../utils/messages.js';

export const sendMessages = (req, res) => {
  const { sender, message } = req.body;

  db.query(
    'INSERT INTO messages (sender, message) VALUES (?, ?)',
    [sender, message],
    (err, result) => {
      if (err) {
        console.error('Error inserting message', err);
        return res.status(500).send('Error saving message to database');
      }

      let botRes = 'I am not sure, I understand';

      // Loop through the predefined responses
      for (let i = 0; i < AllMessages.length; i++) {
        if (message.toLowerCase().includes(AllMessages[i].sender)) {
          botRes = AllMessages[i].bot;
          break;
        }
      }

      db.query(
        'INSERT INTO messages (sender, message) VALUES (?, ?)',
        ['bot', botRes],
        (err) => {
          if (err) {
            console.log('Error inserting bot message', err);
            return res
              .status(500)
              .send('Error saving bot response to database');
          }
          res.status(200).json({ response: botRes });
        }
      );
    }
  );
};
export const getMessages = (req, res) => {
  db.query(`SELECT * from messages ORDER BY created_at ASC`, (err, results) => {
    if (err) {
      return res.status(500).send('Error in retrieving message');
    }
    res.status(201).json(results);
  });
};
