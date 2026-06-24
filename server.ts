import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/chat', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }

      const ai = new GoogleGenAI({ apiKey });
      const { message, history } = req.body;

      // Construct a system instruction for the AI model
      const systemInstruction = `You are an AI Text Chatbot Agent for Heartland Mortgage.
You must:
• Identify intent within 2–3 turns
• Ask one question at a time
• Be calm, clear, and helpful
• Guide toward: Pre-Qualification or Booking a Consultation
• Never give financial advice
• Never guarantee loan approval
• Only use verified information
• Keep answers short and concise.

Primary Intents: Loan programs, Interest rates (general guidance only), Pre-qualification, Refinance options, First-time buyer questions, Application help, Appointment booking.

If asking questions for pre-qualification, ask these ONE AT A TIME:
1. Are you buying or refinancing?
2. Estimated credit score (Excellent, Good, Fair, Poor)?
3. Timeline?
4. Budget / home price range?

Business Info:
Cami Hinz, Licensed Mortgage Loan Originator, NMLS#2808498, North Dakota, USA.
Loan Programs: Conventional, FHA, VA, USDA, Refinance.

If you don't know the answer, say exactly: "Let me confirm that for you."`;

      // Transform history correctly for the new SDK, or just pass it in string format
      // the history sent from client is: { role: 'user' | 'assistant', content: string }
      let formattedHistory = "Previous Conversation:\n";
      for (const msg of history) {
        if (msg.role !== 'system') {
           formattedHistory += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        }
      }

      const prompt = `${systemInstruction}\n\n${formattedHistory}\nUser: ${message}\nAssistant:`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ reply: aiResponse.text });
    } catch (error) {
      console.error('Error with AI generation:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  });

  // FUB API endpoint
  app.post('/api/fub/events', async (req, res) => {
    try {
      const apiKey = "fka_0oN2LuVLtZH0erxLV0IOQXYY1vEE0xZSFx";
      const encodedKey = Buffer.from(apiKey + ":").toString('base64');

      const fubResponse = await fetch("https://api.followupboss.com/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${encodedKey}`
        },
        body: JSON.stringify(req.body)
      });

      if (!fubResponse.ok) {
        const errorText = await fubResponse.text();
        console.error("FUB API Error:", errorText);
        return res.status(fubResponse.status).json({ error: 'Failed to push to FUB', details: errorText });
      }

      const data = await fubResponse.json();
      res.json(data);
    } catch (error) {
      console.error('Error sending to FUB:', error);
      res.status(500).json({ error: 'Failed to process FUB event submission' });
    }
  });

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
