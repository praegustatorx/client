import { Message } from "./Interfaces";

export const dummyMessages: Message[] = [
  {
    role: "User",
    content: "Hello, how are you?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content: "I'm doing well, thank you! How can I assist you today?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "Can you tell me a joke?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "That's funny! Do you have another one?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "Sure! Why don't scientists trust atoms? Because they make up everything!",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "Haha, good one! What else can you do?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "I can help you with programming questions, general knowledge, or even just chat!",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "That's great! Can you explain recursion?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "Of course! Recursion is a process where a function calls itself as a subroutine. It allows problems to be solved in smaller, more manageable pieces.",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "Can you give me an example?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "Sure! A classic example is calculating the factorial of a number. For instance, factorial(5) = 5 * factorial(4), and so on, until factorial(1) = 1.",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "That makes sense. What else can you explain?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "I can explain algorithms, data structures, or even help debug your code. Just let me know what you need!",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "Can you recommend a good programming language to start with?",
    timestamp: new Date().toISOString(),
  },
  {
    role: "Assistant",
    content:
      "Sure! Python is a great language for beginners because of its simple syntax and wide range of applications.",
    timestamp: new Date().toISOString(),
  },
  {
    role: "User",
    content: "Thanks for the advice!",
    timestamp: new Date().toISOString(),
  },
];
