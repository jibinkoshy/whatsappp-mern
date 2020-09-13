import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import axios from './axios';
import './Chat.css';

import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from '@material-ui/icons';
const Chat = ({ messages }) => {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    console.log('input:::', input);
    e.preventDefault();
    await axios.post('/messages/new', {
      message: input,
      name: 'Jibin Koshy',
      timestamp: 'Just now!',
      received: true,
    });

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerinfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && 'chat__receiver'}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}

        {/* <p className="chat__message">
          <span className="chat__name">Jibin</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">Jibin</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message">
          <span className="chat__name">Jibin</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
