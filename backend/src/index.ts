import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';

import config from './config';
import schema from './graphql/schema';
import context from './graphql/context';
import configureSocketIO from './socket/socketConfig';
import initializeSocketHandlers from './socket/socketHandlers';

const app = express() as any;
const server = http.createServer(app);

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser()); // Use cookie-parser middleware
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-fingerprint-id"],
    credentials: true,
  })
); // Configure CORS for GraphQL API

// Initialize Apollo Server in async function
async function startApolloServer() {
  const apolloServer = new ApolloServer({ schema, context });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: config.FRONTEND_URL,
      credentials: true,
    },
  });
}

startApolloServer();

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// Set up Socket.IO
const io = configureSocketIO(server);
initializeSocketHandlers(io);

// Start server
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
