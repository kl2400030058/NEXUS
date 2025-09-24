// This is a server-side file.
'use server';

/**
 * @fileOverview A general GDG query AI agent.
 *
 * - generalGDGQuery - A function that handles general queries about GDG.
 * - GeneralGDGQueryInput - The input type for the generalGDGQuery function.
 * - GeneralGDGQueryOutput - The return type for the generalGDGQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralGDGQueryInputSchema = z.object({
  query: z.string().describe('The question about GDG, upcoming events, or community initiatives.'),
});
export type GeneralGDGQueryInput = z.infer<typeof GeneralGDGQueryInputSchema>;

const GeneralGDGQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type GeneralGDGQueryOutput = z.infer<typeof GeneralGDGQueryOutputSchema>;

export async function generalGDGQuery(input: GeneralGDGQueryInput): Promise<GeneralGDGQueryOutput> {
  return generalGDGQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generalGDGQueryPrompt',
  input: {schema: GeneralGDGQueryInputSchema},
  output: {schema: GeneralGDGQueryOutputSchema},
  prompt: `You are a helpful AI assistant providing information about Google Developer Groups (GDG).

  Answer the following question about GDG, upcoming events, or community initiatives:

  {{query}}`,
});

const generalGDGQueryFlow = ai.defineFlow(
  {
    name: 'generalGDGQueryFlow',
    inputSchema: GeneralGDGQueryInputSchema,
    outputSchema: GeneralGDGQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
