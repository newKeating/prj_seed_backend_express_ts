import { ApolloServer } from "apollo-server-express";
import { isAuthenticated } from "./middlewares";
// import { mergedTypes, mergedResolvers } from "./schema";
import schema from "./schema";

export default new ApolloServer({
  schema,
  // typeDefs: mergedTypes,
  // resolvers: mergedResolvers,
  context: ({ req }) => ({ request: req, isAuthenticated }),
  playground: {
    endpoint: "http://localhost:4000/api",
    settings: {
      "editor.theme": "dark"
    }
  }
});
