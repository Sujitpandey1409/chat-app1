import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchChat } from '../utils/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { token } = useContext(AuthContext);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(prev => [...prev, message]);
        });
    }, []);

    const sendMessage = async () => {
        const { data } = await fetchChat(input);
        socket.emit('message', { message: input, sender: 'user' });
        socket.emit('message', { message: data.response, sender: 'ai' });
        setInput('');
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-4 border rounded">
            <div className="chat-window h-64 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 mb-2 rounded ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
            </div>
        </div>
    );
};

export default Chat;
