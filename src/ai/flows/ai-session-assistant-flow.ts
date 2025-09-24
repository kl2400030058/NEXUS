'use server';

/**
 * @fileOverview An AI assistant for answering questions about sessions.
 *
 * - askSessionAssistant - A function that allows users to ask questions about sessions.
 * - AskSessionAssistantInput - The input type for the askSessionAssistant function.
 * - AskSessionAssistantOutput - The return type for the askSessionAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskSessionAssistantInputSchema = z.object({
  sessionId: z.string().describe('The ID of the session to ask about.'),
  question: z.string().describe('The question to ask about the session.'),
});
export type AskSessionAssistantInput = z.infer<typeof AskSessionAssistantInputSchema>;

const AskSessionAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the session.'),
});
export type AskSessionAssistantOutput = z.infer<typeof AskSessionAssistantOutputSchema>;

export async function askSessionAssistant(input: AskSessionAssistantInput): Promise<AskSessionAssistantOutput> {
  return askSessionAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askSessionAssistantPrompt',
  input: {schema: AskSessionAssistantInputSchema},
  output: {schema: AskSessionAssistantOutputSchema},
  prompt: `You are an AI assistant that answers questions about GDG sessions.

  You are provided with a session ID and a question. Use the session ID to retrieve information about the session.  Then answer the question using the session information.

  Session ID: {{{sessionId}}}
  Question: {{{question}}}
  `,  
});

const askSessionAssistantFlow = ai.defineFlow(
  {
    name: 'askSessionAssistantFlow',
    inputSchema: AskSessionAssistantInputSchema,
    outputSchema: AskSessionAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
