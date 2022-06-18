import { dataController } from "./src/DataController";
import cluster from "node:cluster";
import process from "node:process";
import { cpus } from "node:os";
import ServerController from "./src/ServerController";

const numCPUs = cpus().length;
const args = process.argv.slice(2);
if (args[0] === "--multi") {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    ServerController(dataController);
  }
} else {
  ServerController(dataController);
}
