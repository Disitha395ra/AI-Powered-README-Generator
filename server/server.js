import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import openAI from 'openai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const openai = new openAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate', async (req, res) => {
  const { repoUrl } = req.body;
    try {
        console.log('Received repository URL:', repoUrl);
    }catch(error){
        console.error('Error generating README:', error);
        res.status(500).json({ error: 'Failed to generate README' });
    }

});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});