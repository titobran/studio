
// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Un agente de IA para traducción.
 *
 * - translateAndDisplay - Una función que maneja el proceso de traducción.
 * - TranslateAndDisplayInput - El tipo de entrada para la función translateAndDisplay.
 * - TranslateAndDisplayOutput - El tipo de retorno para la función translateAndDisplay.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateAndDisplayInputSchema = z.object({
  phrase: z.string().describe('La frase a traducir.'),
});
export type TranslateAndDisplayInput = z.infer<typeof TranslateAndDisplayInputSchema>;

const TranslateAndDisplayOutputSchema = z.object({
  englishTranslation: z.string().describe('La frase traducida al inglés.'),
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
