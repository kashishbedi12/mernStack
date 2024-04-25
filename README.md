# MERN Video Chat Application

This project is a MERN stack-based web application where users can connect with random people in video chat. It utilizes Web Sockets and WebRTC for real-time communication.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- React.js
- Node.js
- MongoDB
- npm (Node Package Manager)

## Setup

1. **Start MongoDB**: Make sure MongoDB is running on your localhost on port 27017 with a database named 'strangle'.

2. **Run Backend Servers**: Open three separate terminals and navigate to the backend directory. Then run the following commands:
   - node signalserver.js
   - node soketserver.js
   - node index.js

3. **Run React App**: Navigate to the root directory of the project and run the React app:
   - npm start

## Usage
Once the backend servers and the React app are running, you can open the application in your browser. Users can then connect with random people in video chat.

## Contributing
Contributions are welcome! If you'd like to add new features, improve the code, or fix bugs, feel free to open a pull request.
