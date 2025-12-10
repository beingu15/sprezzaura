// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Suggests blog post topics based on current trends in interior design, event planning, and cleaning.
 *
 * - suggestBlogTopics - A function that suggests blog post topics.
 * - SuggestBlogTopicsInput - The input type for the suggestBlogTopics function.
 * - SuggestBlogTopicsOutput - The return type for the suggestBlogTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTopicsInputSchema = z.object({
  trend: z.string().describe('The area for which blog topics are needed like interior design, event planning or cleaning trends.'),
});
export type SuggestBlogTopicsInput = z.infer<typeof SuggestBlogTopicsInputSchema>;

const SuggestBlogTopicsOutputSchema = z.object({
  topics: z.array(z.string()).describe('An array of suggested blog post topics.'),
});
export type SuggestBlogTopicsOutput = z.infer<typeof SuggestBlogTopicsOutputSchema>;

export async function suggestBlogTopics(input: SuggestBlogTopicsInput): Promise<SuggestBlogTopicsOutput> {
  return suggestBlogTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTopicsPrompt',
  input: {schema: SuggestBlogTopicsInputSchema},
  output: {schema: SuggestBlogTopicsOutputSchema},
  prompt: `Suggest 5 blog post topics based on current trends in the following area:\n\n{{trend}}`,
});

const suggestBlogTopicsFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicsFlow',
    inputSchema: SuggestBlogTopicsInputSchema,
    outputSchema: SuggestBlogTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
