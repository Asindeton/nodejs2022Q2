import os from "node:os";

const { EOL } = os;

export function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

export function invalidInput() {
  console.log(`${EOL}Invalid input`);
}
export function operationFailed() {
  console.log(`${EOL}Operation failed`);
}

export function exitFunc(process, userName) {
  console.log(`${EOL}Thank you for using File Manager, ${userName}!`);
  process.exit();
}
