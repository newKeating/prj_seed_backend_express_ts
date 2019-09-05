import { ApolloServer } from "apollo-server-express";
import { isAuthenticated } from "./middlewares";
import schema from "./schema";

export default new ApolloServer({
  schema,
  context: ({ req }) => ({ request: req, isAuthenticated }),
  playground: {
    endpoint: "http://localhost:5000/api",
    settings: {
      "editor.theme": "dark"
    }
  }
});
