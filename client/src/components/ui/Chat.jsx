import React from 'react';
import { Button } from '@/components/ui/button';

const Chat = ({ Click, flow, text, Change }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col max-w-xl w-full mx-auto p-4 space-y-4 bg-white shadow-lg rounded-lg'>
        <h1 className='text-purple-500 text-center font-bold text-xl'>
          ChatBot
        </h1>
        <div className='chat-box flex-1 overflow-auto p-4 space-y-3 max-h-[400px] md:max-h-[600px] bg-gray-100 rounded-lg'>
          {flow.map((msg, index) => (
            <div
              key={index}
              className={`message p-2 text-black rounded-lg  ${
                msg.sender === 'bot'
                  ? 'bg-blue-100  self-start text-left'
                  : 'bg-green-100  self-end text-right'
              }`}>
              {msg.message}
            </div>
          ))}
        </div>

        <div className='input-container flex items-center space-x-2'>
          <input
            type='text'
            value={text}
            onChange={Change}
            placeholder='Type your message...'
            className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <Button
            onClick={Click}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
