import cluster from "node:cluster";
import process from "node:process";
import { cpus } from "node:os";

const numCPUs = cpus().length;
const args = process.argv.slice(2);
if (args[0] === "--multi") {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    import("./src/ServerController");
  }
} else {
  import("./src/ServerController");
}
