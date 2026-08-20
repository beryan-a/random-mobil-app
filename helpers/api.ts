import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export const ChatAPI = {
  sendMessage: async (message: string) => {
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
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
};
