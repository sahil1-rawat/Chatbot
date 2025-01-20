b.query('SELECT * FROM messages ORDER BY created_at ASC', (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).send('Error retrieving messages');
    }
    res.json(results);
  });
});