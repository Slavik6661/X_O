import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import { router } from "./Rout/GameRout";
import { connectGame } from "./API/socketConnect";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
dotenv.config();
let PORT = process.env.PORT;

app.use(router);

connectGame(io);

httpServer.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

/* "start:ts": "tsc -w",
    "start:js": "nodemon/build/index.js",
    "start": "concurrently npm:start:*" 
    */
