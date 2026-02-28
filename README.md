# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where students can practice SQL queries against pre-configured assignments with real-time execution and intelligent Hints powered by LLM.

## Features
- **Assignment Listing**: Browse SQL exercises by difficulty.
- **SQL Studio**: Integrated Monaco Editor for writing and executing SQL.
- **Real-time Results**: See query outputs or errors immediately.
- **LLM Hints**: Get intelligent guidance from Gemini AI without revealing the full solution.
- **Mobile First**: Fully responsive design for learning on any device.

## Tech Stack
- **Frontend**: React.js, Vite, Vanilla SCSS (BEM), Monaco Editor.
- **Backend**: Node.js, Express.js.
- **Databases**: 
  - PostgreSQL (Sandbox for query execution).
  - MongoDB (Persistence for assignments and metadata).
- **LLM Integration**: Gemini 1.5 Flash via @google/generative-ai.

## Technical Choices
- **Vanilla SCSS**: Used to demonstrate fundamental styling abilities and responsive design control.
- **Monaco Editor**: Provides a professional-grade SQL editing experience.
- **PostgreSQL Sandbox**: Separates user queries from the main application database for security and performance.

## Data-Flow Diagram (Description)
1. **User Request**: User writes a query and clicks "Execute Query".
2. **Frontend Call**: Client sends POST request with SQL to `/api/execute`.
3. **Backend Logic**:
   - `queryEngine.js` validates the SQL (Select only, no destructive keywords).
   - Backend connects to PostgreSQL Sandbox.
   - SQL is executed, and results are fetched.
4. **Response**: Backend returns rows and column names to the client.
5. **UI Update**: Frontend renders the data in a responsive table.

## Setup Instructions
Please refer to the `run.md` file in the root directory for detailed setup and execution steps.
