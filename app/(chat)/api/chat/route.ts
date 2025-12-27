import { convertToModelMessages, stepCountIs, streamText } from 'ai';
import { openai } from "@ai-sdk/openai";
import { queryDatabase } from '@/lib/ai/tools/queryDatabase';
import { SYSTEM_PROMPT } from '@/lib/ai/prompt';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, model } = await req.json();

    const selectedModel = model || "gpt-4o-mini";

    const result = streamText({
        model: openai(selectedModel),
        system: SYSTEM_PROMPT,
        tools: {
            queryDatabase: queryDatabase,
        },
        messages: await convertToModelMessages(messages),
        stopWhen: stepCountIs(3),
    });

    return result.toUIMessageStreamResponse();
}