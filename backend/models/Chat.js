const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [{ message: String, sender: String, timestamp: Date }]
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
