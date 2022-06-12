import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
// /Users/dmitrijlegankov/work/RS/nodejs2022Q2
const { EOL, homedir } = os;
const userName = process.argv[2].split("=")[1];
const rl = readline.createInterface({
  input,
  output,
});
// let __dirname = homedir();
let __dirname = path.join(homedir(), "work/RS/nodejs2022Q2");

console.log(`${EOL}Welcome to the File Manager, ${userName}!`);
writeCurrentDirectory();

rl.on("line", (answer) => {
  if (answer.toLowerCase().trim() == ".exit") {
    exitFunc();
  }
  const answerArr = answer.split(" ");
  switch (answerArr[0]) {
    case "up":
      if (answerArr.length !== 1) {
        invalidInput();
        break;
      }
      __dirname = path.dirname(__dirname);
      break;
    case "cd":
      let initialPath = answerArr[1].startsWith("/") ? "/" : __dirname;
      let newPath = path.join(initialPath, answerArr[1]);
      if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
        __dirname = newPath;
      } else {
        operationFailed();
      }
      break;
    case "ls":
      if (answerArr.length !== 1) {
        invalidInput();
        break;
      }
      fs.readdir(__dirname, (err, files) => {
        if (err) console.log(err);
        else {
          console.log(`${EOL}Current directory filenames:`);
          files.forEach((file) => {
            console.log(file);
          });
          writeCurrentDirectory();
        }
      });
      break;
    case "os":
      if (answerArr.length !== 2) {
        invalidInput();
        break;
      }
      switch (answerArr[1]) {
        case "--EOL":
          console.log(JSON.stringify(os.EOL));
          break;
        case "--cpus":
          console.log(os.cpus());
          break;
        case "--homedir":
          console.log(os.homedir());
          break;
        case "--username":
          console.log(os.userInfo().username);
          break;
        case "--architecture":
          console.log(os.arch());
          break;
        default:
          invalidInput();
      }
      break;
    case "cat":
      if (answerArr.length !== 2) {
        invalidInput();
        break;
      }
      let initialPathOnReadFile = answerArr[1].startsWith("/")
        ? "/"
        : __dirname;
      let pathToReadFile = path.join(initialPathOnReadFile, answerArr[1]);
      if (fs.existsSync(pathToFile)) {
        const readStream = fs.createReadStream(pathToFile);
        streamToString(readStream).then(console.log);
      } else {
        invalidInput();
      }

      break;
    case "add":
      if (answerArr.length !== 2) {
        invalidInput();
        break;
      }
      let pathToCreateFile = path.join(__dirname, answerArr[1]);
      const writableStream = fs.createWriteStream(pathToCreateFile, {
        flags: "a",
      });

      break;
    case "rn":
      if (answerArr.length !== 3) {
        invalidInput();
        break;
      }
      const pathToFile = path.join(__dirname, answerArr[1]);
      const newFilePath = path.join(__dirname, answerArr[2]);

      fs.readdir(path.join(__dirname), function (err, files) {
        try {
          if (files.includes(answerArr[1])) {
            fs.rename(pathToFile, newFilePath, function (err) {
              if (err) throw new Error();
            });
          } else {
            throw new Error();
          }
        } catch (err) {
          operationFailed();
        }
      });

      break;
    case "cp":
      if (answerArr.length !== 3) {
        invalidInput();
        break;
      }
      const pathToFileForCopy = path.join(__dirname, answerArr[1]);
      const newDirectoryPath = path.join(__dirname, answerArr[2]);
      const cpReadStream = fs.createReadStream(pathToFileForCopy);
      const cpWriteStream = fs.createWriteStream(
        path.join(newDirectoryPath, answerArr[1]),
        {
          flags: "a",
        },
      );

      try {
        cpReadStream
          .on("error", invalidInput)
          .pipe(cpWriteStream.on("error", invalidInput));
      } catch (error) {
        operationFailed();
      }

      break;
    case "mv":
      if (answerArr.length !== 3) {
        invalidInput();
        break;
      }
      const pathToFileForMove = path.join(__dirname, answerArr[1]);
      const newDirectoryPathMove = path.join(__dirname, answerArr[2]);

      const cpReadStreamMove = fs.createReadStream(pathToFileForMove);
      const cpWriteStreamMove = fs.createWriteStream(
        path.join(newDirectoryPathMove, answerArr[1]),
        {
          flags: "a",
        },
      );

      cpReadStreamMove
        .on("error", invalidInput)
        .pipe(cpWriteStreamMove)
        .on("close", function (err) {
          fs.readdir(newDirectoryPathMove, function (err, files) {
            try {
              if (answerArr[1]) {
                fs.unlink(pathToFileForMove, function (err) {
                  if (err) invalidInput();
                });
              } else {
                throw new Error("FS operation failed");
              }
            } catch (err) {
              operationFailed();
            }
          });
        })
        .close();

      break;
    case "rm":
      if (answerArr.length !== 2) {
        invalidInput();
        break;
      }
      const pathToFileForRemove = path.join(__dirname, answerArr[1]);

      fs.unlink(pathToFileForRemove, function (err) {
        if (err) invalidInput();
      });

      break;
    default:
      invalidInput();
  }
  setTimeout(writeCurrentDirectory, 10);
});

process.on("SIGINT", () => {
  exitFunc();
});

const exitFunc = () => {
  console.log(`${EOL}Thank you for using File Manager, ${userName}!`);
  process.exit();
};

function writeCurrentDirectory(dir = __dirname) {
  console.log(`${EOL}You are currently in, ${dir}`);
  rl.prompt();
}
function invalidInput() {
  console.error(`${EOL}Invalid input`);
}
function operationFailed() {
  console.log(`${EOL}Operation failed`);
}

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
