import OpenAI from 'openai';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.chatanywhere.tech/v1',
});

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Bhagavad Gita GPT. Always reply in Telugu language. Include relevant slokas from the Bhagavad Gita in Sanskrit and explain them in Telugu. Keep answers accurate and spiritually insightful.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    res.json({ reply: chat.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
});

export default router;
