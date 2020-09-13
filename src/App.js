import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';

function App() {
  useEffect(() => {
    const pusher = new Pusher('7c784c2f344754b24efc', {
      cluster: 'us2',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
