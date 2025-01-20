import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Chat from './components/ui/Chat';

function App() {
  const [flow, setFlow] = useState([]);
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('/api/messages');
      setFlow(response.data);
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    setFlow((prevFlow) => [...prevFlow, { sender: 'user', message: input }]);

    const response = await axios.post('/api/messages', {
      sender: 'user',
      message: input,
    });

    setFlow((prevFlow) => [
      ...prevFlow,
      { sender: 'bot', message: response.data.response },
    ]);

    setInput('');
  };

  return (
    <Chat Click={handleSend} flow={flow} text={input} Change={handleChange} />
  );
}

export default App;
