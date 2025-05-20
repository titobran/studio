// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview A translation AI agent.
 *
 * - translateAndDisplay - A function that handles the translation process.
 * - TranslateAndDisplayInput - The input type for the translateAndDisplay function.
 * - TranslateAndDisplayOutput - The return type for the translateAndDisplay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateAndDisplayInputSchema = z.object({
  phrase: z.string().describe('The phrase to translate.'),
});
export type TranslateAndDisplayInput = z.infer<typeof TranslateAndDisplayInputSchema>;

const TranslateAndDisplayOutputSchema = z.object({
  englishTranslation: z.string().describe('The translated phrase in English.'),
});
export type TranslateAndDisplayOutput = z.infer<typeof TranslateAndDisplayOutputSchema>;

export async function translateAndDisplay(input: TranslateAndDisplayInput): Promise<TranslateAndDisplayOutput> {
  return translateAndDisplayFlow(input);
}

const translateAndDisplayPrompt = ai.definePrompt({
  name: 'translateAndDisplayPrompt',
  input: {schema: TranslateAndDisplayInputSchema},
  output: {schema: TranslateAndDisplayOutputSchema},
  prompt: `Translate the following phrase to English:\n\n{{phrase}}`,
});

const translateAndDisplayFlow = ai.defineFlow(
  {
    name: 'translateAndDisplayFlow',
    inputSchema: TranslateAndDisplayInputSchema,
    outputSchema: TranslateAndDisplayOutputSchema,
  },
  async input => {
    const {output} = await translateAndDisplayPrompt(input);
    return output!;
  }
);
