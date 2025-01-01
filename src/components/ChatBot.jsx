import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import configuration from "../lib/configuration";
const genAI = new GoogleGenerativeAI(configuration.gemini);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatComponent = () => {
    const [input, setInput] = useState(""); // For user input
    const [chatHistory, setChatHistory] = useState([]); // Start with empty history
    const [modelStarted, setModelStarted] = useState(false); // Track if model is initialized
  
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };
  
    const sendMessage = async () => {
      if (!input.trim()) return; // Prevent empty messages
  
      // Update the chat history with the user's message
      const updatedHistory = [
        ...chatHistory,
        { role: "user", parts: [{ text: input }] },
      ];
      setChatHistory(updatedHistory);
  
      try {
        // Start a chat session with the updated history
        const chat = model.startChat({
          history: updatedHistory.length > 0 ? updatedHistory : [{ role: "user", parts: [{ text: input }] }],
        });
        setModelStarted(true); // Ensure the model is flagged as initialized
        const result = await chat.sendMessageStream(input);
  
        // Collect the model's response
        let responseText = "";
        for await (const chunk of result.stream) {
          responseText += chunk.text();
        }
  
        // Update the chat history with the model's response
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", parts: [{ text: responseText }] },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
  
      setInput(""); // Clear input
    };
  
    // Initialize model's response if it's the first interaction
    const initializeModel = async () => {
      if (chatHistory.length === 0 && !modelStarted) {
        const initialMessage = "Hello! How can I help you today?";
        setChatHistory([
          { role: "user", parts: [{ text: "Hello" }] },
          { role: "model", parts: [{ text: initialMessage }] },
        ]);
        setModelStarted(true);
      }
    };
  
    React.useEffect(() => {
      initializeModel();
    }, []);
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
          <div className="h-96 overflow-y-auto mb-4">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  entry.role === "user"
                    ? "text-right text-blue-500"
                    : "text-left text-gray-800"
                }`}
              >
                <p
                  className={`inline-block p-2 rounded-lg ${
                    entry.role === "user"
                      ? "bg-blue-100"
                      : "bg-gray-200"
                  }`}
                >
                  {entry.parts[0].text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
};

export default ChatComponent;
