const Chat = require('../models/Chat');
const { Configuration, OpenAIApi } = require('openai');node -v

require('dotenv').config(); // Ensure environment variables are loaded

// Configure OpenAI API
const configuration = Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

exports.getChat = async (req, res) => {
    const { message } = req.body;
    const { userId } = req; // Ensure `userId` is set in the request

    try {
        // Find or create the user's chat history
        let chat = await Chat.findOne({ userId });
        if (!chat) {
            chat = new Chat({ userId, messages: [] });
        }

        // Add user's message to chat history
        chat.messages.push({ message, sender: 'user', timestamp: new Date() });

        // Request AI response from OpenAI
        const response = await openai.createChatCompletion({
            model: 'gpt-4', // Use 'gpt-4' if you want the latest model
            messages: [{ role: 'user', content: message }],
        });

        const aiMessage = response.data.choices[0].message.content;

        // Add AI's response to chat history
        chat.messages.push({ message: aiMessage, sender: 'ai', timestamp: new Date() });
        await chat.save();

        // Send AI's response to the client
        res.json({ response: aiMessage });
    } catch (err) {
        console.error('Error fetching chat:', err);
        res.status(500).json({ message: 'Error fetching chat' });
    }
};
