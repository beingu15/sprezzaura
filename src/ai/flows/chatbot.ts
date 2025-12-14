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

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  system: `You are a friendly and helpful AI assistant for "Sprezzaura", a company offering premium services in cleaning, home decor, and event management.

Your goal is to answer user questions, provide information about Sprezzaura's services, and guide them to the correct pages on the website.

Services offered:
- Impeccable Cleaning: Residential & Commercial, Eco-Friendly Products.
- Home Decor & Styling: Personalized Consultation, Furniture & Accessory Sourcing.
- Elegant Event Management: Weddings, Corporate Functions, Vendor Coordination.

Key Information:
- The user can get a free quote by visiting the Contact page.
- The user can estimate cleaning costs using the cost calculator.
- The blog has articles on design, event planning, and cleaning.

Be conversational and professional. Keep your responses concise.`,
  prompt: (input) => {
    return {
      messages: [
        ...input.history.map((msg) => ({
          role: msg.role,
          content: [{ text: msg.content }],
        })),
        {
          role: 'user' as const,
          content: [{ text: input.message }],
        },
      ],
    };
  },
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return { response: output!.response };
  }
);
