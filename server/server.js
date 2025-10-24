import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
console.log(
  "Gemini API Key loaded:",
  process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No"
);

const app = express();
app.use(express.json());
app.use(cors());


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
  const { repoUrl } = req.body;
    try {
      const parts = repoUrl.split("github.com/")[1];
      const [owner, repo] = parts.split("/");

      //fetch repo details
      const { data } = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      const { name, description, language, topics, stargazers_count } = data;

      //prompt for OpenAI
      const prompt = `
        Create a clean, professional README.md for this GitHub project:
        - Name: ${name}
        - Description: ${description}
        - Language: ${language}
        - Stars: ${stargazers_count}
        - Topics: ${topics.join(", ")}

        Include:
        1. Title and badges (GitHub stars, forks, license)
        2. Summary
        3. Features
        4. Tech Stack
        5. Installation Steps
        6. Usage Instructions
        7. Contributing
        8. License Section
        `;

      // Call OpenAI API
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const readme = result.response.text();
      res.json({ readme });
    }catch(error){
        console.error('Error generating README:', error);
        res.status(500).json({ error: 'Failed to generate README' });
    }

});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});