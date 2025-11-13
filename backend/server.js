import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';

const app = express();
app.use(cors());
app.use(express.json());


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      reasoning_effort: "medium"
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error calling Groq:', error);
    res.status(500).json({ error: 'Failed to get Groq response' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
