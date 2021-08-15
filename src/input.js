import fs from "fs";

const stdinInput = () => {
  let buffer = Buffer.alloc(1)
  fs.readSync(0, buffer, 0, 1)
  return buffer[0]
}

export default stdinInput
