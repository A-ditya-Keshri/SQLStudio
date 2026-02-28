import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function getHint(assignment, userQuery) {
  const prompt = `
    You are a SQL teaching assistant for CipherSQLStudio.
    A student is working on the following SQL assignment:
    
    Assignment Title: ${assignment.title}
    Question: ${assignment.question}
    Table Schema: ${assignment.schemaDescription}
    
    The student's current (possibly incorrect or incomplete) query is:
    \`\`\`sql
    ${userQuery}
    \`\`\`
    
    Your goal is to provide a helpful HINT, not the solution query.
    - DO NOT give the full SQL query.
    - DO NOT give the answer.
    - Explain the logic or identify what might be missing (e.g., JOIN, WHERE clause, specific aggregation).
    - Keep it concise and encouraging.
    
    Hint:
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Sorry, I couldn't generate a hint right now. Please try again.";
  }
}

export { getHint };
