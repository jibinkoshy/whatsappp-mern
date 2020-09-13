import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessage() {
      const res = await axios.get('/messages/sync');
      // console.log('res:::', res.data);
      const messages = await res.data;
      setMessages(messages);
    }
    fetchMessage();
  }, []);
  useEffect(() => {
    const pusher = new Pusher('7c784c2f344754b24efc', {
      cluster: 'us2',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      // alert(JSON.stringify(newMessage));

      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  console.log('messages:::', messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
