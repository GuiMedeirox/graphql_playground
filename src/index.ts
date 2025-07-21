import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schema';

dotenv.config();

async function startServer() {
  const app = express();
  const port = process.env.PORT || 4000;

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req,
    }),
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return error;
    },
  });

  await server.start();

  // Apply middleware
  server.applyMiddleware({ app, path: '/graphql' });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Start server
  app.listen(port, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`📊 Apollo Studio available at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🏥 Health check available at http://localhost:${port}/health`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 