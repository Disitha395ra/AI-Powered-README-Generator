import express from "express";
import axios from "axios";
import cors from "cors";
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

// ✅ Initialize Gemini with your API key and specify the model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  model: "gemini-2.5-flash",
});

// ✅ Define route for generating README
app.post("/generate", async (req, res) => {
  const { repoUrl } = req.body;

  try {
    if (!repoUrl || !repoUrl.includes("github.com/")) {
      return res.status(400).json({ error: "Invalid GitHub repository URL" });
    }

    // Extract owner and repo name
    const parts = repoUrl.split("github.com/")[1];
    const [owner, repo] = parts.split("/");

    // ✅ Fetch repo details from GitHub API
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const { name, description, language, topics = [], stargazers_count } = data;

    // ✅ Create a professional README prompt
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

    // ✅ Use the correct Gemini model (v1beta API)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const readme = response.text();

    res.json({ readme });
  } catch (error) {
    console.error("Error generating README:", error);

    // ✅ Better error output
    if (error.message.includes("404")) {
      return res.status(404).json({
        error:
          "Model not found. Please make sure you are using a supported Gemini model (e.g., gemini-2.5-flash or gemini-2.5-pro).",
      });
    }

    res.status(500).json({ error: "Failed to generate README" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server is running on port 5000");
});
