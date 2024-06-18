import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import InAppNotification from './InAppNotification';

const socket = io('https://d3c7d415-f2a1-43bd-a94d-5f4db1f3d694-00-2uqlanhm04l8p.picard.replit.dev');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Request notification permission
        if ('Notification' in window) {
            window.Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                } else {
                    console.log('Notification permission denied.');
                }
            });
        }

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            setNotification(`New Message: ${message}`);
            if ('Notification' in window && window.Notification.permission === 'granted') {
                new window.Notification('New Message', { body: message });
            }
            setTimeout(() => {
                setNotification('');
            }, 3000);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat App</h2>
            <MessageList messages={messages} />
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
            {notification && <InAppNotification message={notification} />}
        </div>
    );
};

export default Chat;
