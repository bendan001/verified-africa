import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { z } from "zod";

const paragraphSchema = z.object({
  paragraph: z
    .string()
    .describe("A single paragraph of the story (3-5 sentences)"),
  promptToImage: z
    .string()
    .describe(
      "A detailed visual description for generating an image that matches this paragraph",
    ),
});

const storySchema = z.object({
  title: z.string().describe("The title of the story"),
  paragraphs: z
    .array(paragraphSchema)
    .min(10)
    .describe(
      "Array of at least 10 paragraphs ,each with story text and image prompt",
    ),
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return Response.json(
        {
          error: "Prompt is required",
        },
        { status: 400 },
      );
    }

    const { output } = await generateText({
      model: openrouter("google/gemini-2.5-flash"),
      output: Output.object({
        schema: storySchema,
      }),
      system: `You are a creative storyteller. Generate a detailed, engaging story with at least 10 paragraphs. 
      
      For each paragraph:
      1. Write 3-5 compelling sentences that advance the story
      2. Create a detailed visual prompt for AI image generation (be specific about scene, characters, mood, colors, style)
      
      Make sure the story has a clear beginning, middle, and end. Each paragraph should flow naturally to the next.`,
      prompt: `Write a creative story based on: ${prompt}. The story must have at least 10 detailed paragraphs with corresponding image prompts for each paragraph.`,
      temperature: 0.7,
    });

    return Response.json(output);
  } catch (error) {}
}
