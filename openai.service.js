const fs = require("fs");
//defines an asynchronous function that takes openai as an argument
const createAssistant = async (openai) => {
  // Assistant file path
  const assistantFilePath = "assistant.json";

  // check if the file assistant.json exists
  if (!fs.existsSync(assistantFilePath)) {
    // create a new file in OpenAI by uploading a document (new knowledge base.docx) for the assistant's knowledge base.
    const file = await openai.files.create({
      file: fs.createReadStream("knowledge base.docx"),
      purpose: "assistants",
    });

    // create a vector store using the file uploaded earlier. A vector store is used to store and retrieve embeddings for better contextual understanding.
    let vectorStore = await openai.beta.vectorStores.create({
      name: "Rodud knowledge base",
      file_ids: [file.id],
    });

    // Create assistant
    const assistant = await openai.beta.assistants.create({
      name: "Rodud Assistant2",
      instructions: ` answer customers questions about Rodud company
      if the user speak in english then you answer in english, if he speakes in arabic then you answer in arabic.
      rodud in arabic is ردود, remember this when you speak in arabic.
if you don't know the answer then say i don't know please contact this email: info@rodud.com `,
      tools: [{ type: "file_search" }],
      tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
      model: "gpt-4o-mini",
    });

    // The assistant's information is written to assistant.json to avoid recreating it in future runs.
    fs.writeFileSync(assistantFilePath, JSON.stringify(assistant));
    return assistant;
  } else {
    // If the file exist, read the assistant from assistant.json instead of creating a new one.
    const assistant = JSON.parse(fs.readFileSync(assistantFilePath));
    return assistant;
  }
};
//exports the createAssistant function so it can be used in other parts of the application.
module.exports = { createAssistant };
