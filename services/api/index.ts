import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response type for API calls
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Send a message to the chat API
 * @param message The message to send
 */
export const sendMessage = async (message: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(
      process.env.EXPO_PUBLIC_CHAT_API_URL || "",
      {
        message,
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export default {
  sendMessage,
  api
};