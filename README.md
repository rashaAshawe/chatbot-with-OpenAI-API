Overview of the Chatbot
This chatbot is designed to serve as a customer assistant, providing intelligent responses to questions about the company. It leverages the GPT-4o-mini model from OpenAI, which is the latest model known for its smart and cost-effective performance. The frontend interface is managed through Voice flow, focusing solely on text interactions. This setup ensures a robust, efficient, and affordable solution for assisting customers and providing them with accurate information about the company.

YouTube video explaining everything
	https://www.youtube.com/watch?v=Uk5f3ajkfSs&t=45s 

links 
OpenAI (to create the Api key) https://platform.openai.com/assistants/asst_43rpJk27EkvldtVJNHqxXrPW 

VoiceFlow template https://creator.voiceflow.com/project/66b4c2cebe5f7a16bcdc8070/canvas/64dbb6696a8fab0013dba194 

Steps to Run the Code

1.	Create an OpenAI Account and Project:
o	Visit the OpenAI website and create an account if you don’t have one.
o	Once logged in, create a new project under your OpenAI account.
2.	Create an API Key:
o	Within your new project, navigate to the API section.
o	Generate a new API key, which will be used to authenticate your requests to the OpenAI API.
3.	Set Up the API Key:
o	Copy the generated API key.
o	Add the API key to your system environment variables. You can do this by:
	On Windows: Go to System Properties > Environment Variables and add a new variable with the name OPENAI_API_KEY and paste your key as the value.
	On macOS/Linux: Add the following line to your .bash_profile or .zshrc:
export OPENAI_API_KEY="your_api_key_here"
o	Alternatively, you can directly insert the API key into the code by replacing the placeholder in the code where the API key is required.
4.	Clone the Chatbot Workflow on Voiceflow:
o	Go to Voiceflow and log into your account.
o	Clone the chatbot workflow that I have created. This will give you access to the frontend design and logic flow of the chatbot.
5.	Update the Endpoints in Voiceflow:
o	Within your cloned Voiceflow project, locate the POST and GET requests that interact with the backend.
o	Replace the existing URLs with your own endpoints that point to your server where the chatbot logic is hosted.
o	Save the changes and publish your updated workflow.
6.	Embed the Chatbot on Your Website:
o	After publishing the workflow, copy the widget code that Voiceflow provides.
o	Add this code to the end of your website's HTML. Once added, the chat widget should appear in the bottom right corner of your website, allowing users to interact with the chatbot directly.
7.	Run the Chatbot:
o	After setting up the environment and configuring the endpoints, you can run the chatbot either locally or deploy it to your preferred hosting service.
o	Interact with the chatbot through the text-based interface on Voiceflow, and it should now function with your custom backend, powered by the smart and affordable GPT-4o-mini model from OpenAI.
Updating the Knowledge Base
When you update the knowledge base file (e.g., changing or adding new information), you need to follow these additional steps:
1.	Delete the Old assistant.json File:
o	Before running the code again, ensure that the old assistant.json file is deleted. This file contains the previous assistant configuration, which is tied to the old knowledge base.
2.	Run the Code Again:
o	After deleting the assistant.json file, run the code again. This will create a new assistant using the updated knowledge base file, ensuring that the chatbot reflects the latest information.
This process ensures that your chatbot is always up-to-date with the latest company information, providing accurate and reliable assistance to your customers.

