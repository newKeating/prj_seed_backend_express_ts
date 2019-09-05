import "./env";
// import { Options } from "graphql-yoga";
// import { GraphQLServer } from "graphql-yoga";
import express from "express";
import apollo from "./apollo";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import common from "./config/common";
import "./passport";
import { authenticateJwt } from "./passport";
import { uploadMiddleware, uploadController } from "./upload";

// const PORT: number | string = process.env.PORT || 4000;

const app = express();

// const server = new GraphQLServer({
//   schema,
//   context: ({ request }) => ({ request, isAuthenticated })
// });

function setPort(port = 5000) {
  app.set("port", parseInt(String(port), 10));
}

function listen() {
  createConnection(connectionOptions)
    .then(() => {
      const port = app.get("port") || common.port;
      app.listen(port, () => {
        console.log(`🚀 Server ready at ${port}`);
      });
    })
    .catch(error => console.log(error));
}

app.use(
  cors({
    origin: common.corsDomain,
    optionsSuccessStatus: 200
  })
);
app.use(logger("dev"));
app.use(helmet());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(authenticateJwt);
app.post("/api/upload", uploadMiddleware, uploadController);

// const options: Options = {
//   port: PORT,
//   cors: {
//     credentials: true,
//     origin: ["http://localhost:3000"]
//   }
// };

// const handleAppStart = () =>
//   console.log(`✅ Server running on http://localhost:${PORT}`);

// createConnection(connectionOptions)
//   .then(() => {
//     server.start(options, handleAppStart);
//   })
//   .catch(error => console.log(error));

apollo.applyMiddleware({
  app,
  path: "/api"
});

export default {
  getApp: () => app,
  setPort,
  listen
};
