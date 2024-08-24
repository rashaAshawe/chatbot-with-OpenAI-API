const express = require("express"); //web framework for Node.js to create web applications.
const cors = require("cors");//Middleware for handling Cross-Origin Resource Sharing
const bodyParser = require("body-parser");//Middleware to parse incoming request bodies, particularly JSON
const fs = require("fs");
const OpenAI = require("openai");

const { createAssistant } = require("./openai.service");

const app = express();

//Create an instance of OpenAI's API client using an API key from environment variables.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//apply CORS and JSON body parsing middleware to the Express app.
app.use(cors());
app.use(bodyParser.json());

//Asynchronous Function to Initialize the Assistant
(async () => {
  const assistant = await createAssistant(openai);

  // Handle root URL
  app.get("/", (req, res) => {
    res.send("Welcome to Rodud Chat Assistant API");
  });
  
//Handling /start Endpoint
  app.get("/start", async (req, res) => {
    try {
      //creating a new thread via the OpenAI API and returning its ID.
      const thread = await openai.beta.threads.create();
      return res.json({ thread_id: thread.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create thread" });
    }
  });
  
  //Handling /chat Endpoint
  app.post("/chat", async (req, res) => {
    try {
      const assistantId = assistant.id;
      const threadId = req.body.thread_id;
      const message = req.body.message;
      // Check if the thread ID is provided
      if (!threadId) {
        return res.status(400).json({ error: "Missing thread_id" });
      }
      
      // Log the received message and thread ID to the console for debugging purposes
      console.log(`Received message: ${message} for thread ID: ${threadId}`);
      
      // Send the user's message to the assistant's thread
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      });
      // Run the assistant's response generation process for the thread
      const run = await openai.beta.threads.runs.createAndPoll(threadId, {// Retrieve the list of messages from the thread after the assistant has generated a response
        assistant_id: assistantId,
      });
      // Extract the assistant's response from the retrieved messages
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const response = messages.data[0].content[0].text.value;
      // Return the assistant's response to the client as a JSON object
      return res.json({ response });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
})();

