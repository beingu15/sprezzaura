
'use server';

/**
 * @fileOverview A Genkit flow for a conversational AI chatbot for the Sprezzaura website.
 *
 * chat - A function that takes the chat history and a new message, and returns the AI's response.
 * ChatInput - The input type for the chat function.
 * ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string().describe('The latest message from the user.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const systemPrompt = `You are a friendly and helpful AI assistant for "Sprezzaura", a premium service company based in Melbourne, Australia.

Your goal is to answer user questions about our services (Cleaning, Home Decor, and Event Management) and provide accurate contact and location information.

Services offered:
- Impeccable Cleaning: Residential & Commercial, Eco-Friendly Products.
- Home Decor & Styling: Property Staging, Interior Styling, Furniture Rental.
- Elegant Event Management: Weddings, Corporate Functions, Complete Planning.

Contact Information:
- Main Office: 8 Westgarth avenue, Mickleham VIC 3064, Australia.
- General Phone: 1300 208 199
- General Email: info@sprezzaura.au

Departmental WhatsApp Contacts:
- Cleaning Service: +61 0485599796
- Interior & Home Decor: +61 420 809 418
- Event Management: +61 0494618956

Social Media:
- Facebook: https://www.facebook.com/share/1CQtW4WdPr/
- Instagram: https://www.instagram.com/sprezzaura_pty_ltd/

Key Features:
- Users can get a free quote on the Contact page.
- There is a Cleaning Cost Calculator available on the Cleaning Services page.
- We have a blog with expert insights on design and organization.

Be conversational, professional, and helpful. Keep responses concise and prioritize guiding users to relevant sections or contact methods.`;


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { history, message } = input;

    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      system: systemPrompt,
      history: history.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
      prompt: message,
    });
    
    return { response: text };
  }
);
