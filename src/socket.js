import { io } from "socket.io-client";
import { NODE_SERVER } from "./config";

export const socket = io(NODE_SERVER, {
    autoConnect: true
  });