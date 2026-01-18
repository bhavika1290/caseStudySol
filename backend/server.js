import express from "express";
import cors from "cors";
import "dotenv/config";

import { OpenAI } from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.HF_TOKEN,
});


app.post("/api/generate", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const chatCompletion = await client.chat.completions.create({
	model: "zai-org/GLM-4.7:novita",
    messages: [
        {
            role: "user",
            content: prompt,
        }
    ],
});
    const text = chatCompletion.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));





