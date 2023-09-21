import * as dotenv from "dotenv";
import http from "http";
import { app } from "./app";

dotenv.config();

const start = async () => {
  const PORT = 3000;

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");

    server.close(() => {
      console.log("HTTP server closed");
    });
  });
};

start();
