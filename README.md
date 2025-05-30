# Speech AI Assistant 

A mobile-friendly speech interface application built using React.JS. It implements LLM and utilizes the web speech api to listen for questions and read back the responses. Used for mock interview purposes.

## Running Locally
1. After cloning the project, `npm install`
2. You need to create `.env` file and add your OpenAI Api Key.

    ```REACT_APP_API_KEY=your_api_key```

3. `npm start`
4. Go to http://localhost:3000

**Note**: This uses `gpt-4.1-nano` model but you can set the model in the POST request inside `api.js`.
