import * as assert from "assert"
import { InterpreterFactory } from "./brainfuck.js"

let output = ''
const outputMock = data => {
  output = output + String.fromCharCode(data)
}

const src = `--[----->+<]>.+++++++++..`
const interpreter = InterpreterFactory({ output: outputMock })
interpreter(src).then(() => {
  assert.strictEqual(output, 'foo')
})
