'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating SEO-friendly descriptions for services and blog posts.
 *
 * generateSeoDescription - A function that takes content and keywords as input and returns an SEO-optimized description.
 * GenerateSeoDescriptionInput - The input type for the generateSeoDescription function.
 * GenerateSeoDescriptionOutput - The return type for the generateSeoDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoDescriptionInputSchema = z.object({
  content: z
    .string()
    .describe('The content for which to generate an SEO description.'),
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords to include in the description.'
    ),
  tone: z
    .string()
    .optional()
    .default('professional')
    .describe('The tone of the description (e.g., professional, friendly).'),
  maxLength: z
    .number()
    .optional()
    .default(160)
    .describe('The maximum length of the description in characters.'),
});

export type GenerateSeoDescriptionInput = z.infer<
  typeof GenerateSeoDescriptionInputSchema
>;

const GenerateSeoDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('The SEO-optimized description for the content.'),
});

export type GenerateSeoDescriptionOutput = z.infer<
  typeof GenerateSeoDescriptionOutputSchema
>;

export async function generateSeoDescription(
  input: GenerateSeoDescriptionInput
): Promise<GenerateSeoDescriptionOutput> {
  return generateSeoDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoDescriptionPrompt',
  input: {schema: GenerateSeoDescriptionInputSchema},
  output: {schema: GenerateSeoDescriptionOutputSchema},
  prompt: `You are an SEO expert. Generate a concise and engaging SEO description for the following content, incorporating the given keywords.  The tone should be {{{tone}}}.  The maximum length is {{maxLength}} characters.  Make sure the description is well-written and optimized for search engines.

Content: {{{content}}}

Keywords: {{{keywords}}}`,
});

const generateSeoDescriptionFlow = ai.defineFlow(
  {
    name: 'generateSeoDescriptionFlow',
    inputSchema: GenerateSeoDescriptionInputSchema,
    outputSchema: GenerateSeoDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
