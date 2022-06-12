import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { createHmac } from "node:crypto";
import {
  streamToString,
  invalidInput,
  operationFailed,
  exitFunc,
} from "./src/utils.js";
import zlib from "node:zlib";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";

const { EOL, homedir } = os;
const arg = process.argv.splice(2);
const userName = arg.length > 0 ? arg[0].split("=")[1] : "EmptyName";
const rl = readline.createInterface({
  input,
  output,
});

let __dirname = homedir();

console.log(`${EOL}Welcome to the File Manager, ${userName}!`);
writeCurrentDirectory(__dirname);

rl.on("line", (answer) => {
  if (answer.toLowerCase().trim() == ".exit") {
    exitFunc(process, userName);
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
          files.forEach((file) => {
            console.log(file);
          });
          writeCurrentDirectory(__dirname);
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
          console.table(
            os
              .cpus()
              .map((val) => [
                val.model,
                val.speed < 100
                  ? (val.speed / 10).toFixed(2) + " GHz"
                  : (val.speed / 1000).toFixed(2) + " GHz",
              ]),
          );
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

      if (fs.existsSync(pathToReadFile)) {
        const readStream = fs.createReadStream(pathToReadFile);
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
      fs.createWriteStream(pathToCreateFile, {
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
    case "hash":
      if (answerArr.length !== 2) {
        invalidInput();
        break;
      }
      let initialPathOnReadFileHash = answerArr[1].startsWith("/")
        ? "/"
        : __dirname;

      let pathToReadFileHash = path.join(
        initialPathOnReadFileHash,
        answerArr[1],
      );

      if (fs.existsSync(pathToReadFileHash)) {
        const readStreamHash = fs.createReadStream(pathToReadFileHash);
        streamToString(readStreamHash).then((result) =>
          console.log(createHmac("sha256", result).digest("hex")),
        );
      } else {
        invalidInput();
      }

      break;
    case "compress":
      if (answerArr.length !== 3) {
        invalidInput();
        break;
      }
      const pathToFileForCompress = path.join(__dirname, answerArr[1]);
      const newDirectoryPathCompress = path.join(__dirname, answerArr[2]);

      const brotli = zlib.createBrotliCompress();
      const cpReadStreamCompress = fs.createReadStream(pathToFileForCompress);
      const cpWriteStreamCompress = fs.createWriteStream(
        path.join(newDirectoryPathCompress),
        {
          flags: "a",
        },
      );

      cpReadStreamCompress
        .on("error", invalidInput)
        .pipe(brotli.on("error", operationFailed))
        .pipe(cpWriteStreamCompress.on("error", invalidInput));

      break;
    case "decompress":
      if (answerArr.length !== 3) {
        invalidInput();
        break;
      }
      const pathToFileForDecompress = path.join(__dirname, answerArr[1]);
      const newDirectoryPathDecompress = path.join(__dirname, answerArr[2]);

      const decompressBrotli = zlib.createBrotliDecompress();
      const cpReadStreamDecompress = fs.createReadStream(
        pathToFileForDecompress,
      );
      const cpWriteStreamDecompress = fs.createWriteStream(
        path.join(newDirectoryPathDecompress),
        {
          flags: "a",
        },
      );

      cpReadStreamDecompress
        .on("error", invalidInput)
        .pipe(decompressBrotli.on("error", operationFailed))
        .pipe(cpWriteStreamDecompress.on("error", invalidInput));

      break;
    default:
      invalidInput();
  }
  setTimeout(writeCurrentDirectory, 10);
});

process.on("SIGINT", () => {
  exitFunc(process, userName);
});

function writeCurrentDirectory(dir = __dirname) {
  console.log(`${EOL}You are currently in, ${dir}`);
  rl.prompt();
}
