/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import { HttpsOptions } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Runtime configuration
const runtimeOpts: HttpsOptions = {
  region: "europe-west1",
  memory: "256MiB",
  timeoutSeconds: 60,
  minInstances: 0,
  maxInstances: 10,
  concurrency: 80,
};

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// ChatGPT API endpoint
export const chatGPT = onRequest(runtimeOpts, async (request, response) => {
  try {
    // Enable CORS
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    // Check if it's a POST request
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    // Get the message from request body
    const { message } = request.body;

    if (!message) {
      response.status(400).json({
        error: "Message is required in the request body",
      });
      return;
    }

    logger.info("Sending request to ChatGPT", { message });

    // Call ChatGPT API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
      max_tokens: 500,
      temperature: 0.7,
    });

    // Get the response
    const aiResponse = completion.choices[0].message.content;

    logger.info("Received response from ChatGPT", { aiResponse });

    // Send the response back
    response.status(200).json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    logger.error("Error in ChatGPT function", { error });
    response.status(500).json({
      success: false,
      error: "Internal Server Error",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

