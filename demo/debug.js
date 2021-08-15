import { InterpreterFactory } from "../src/brainfuck.js"
import stdinInput from "./../src/input.js"

const src = `+>+>,...+`

let output = ''
const debugOutput = (data) => {
  output += String.fromCharCode(data)
}

const debugInput = () => {
  process.stdout.write('Enter byte:')
  return stdinInput()
}

const consoleDebug = async ({ cells, i, character }) => {
  console.clear()

  process.stdout.write(src.substr(0, character))
  process.stdout.write('\x1b[44m' + src[character] + '\x1b[0m')
  process.stdout.write(src.substr(character + 1))
  process.stdout.write('\n\n')

  process.stdout.write('Cells: ' + Array.from(cells)
    .map((cell, pos) => pos === i ? (`\x1b[42m${cell}\x1b[0m`) : cell)
    .join('|') + '\n')
  process.stdout.write('Index: ' + i)
  process.stdout.write('\n\n')

  process.stdout.write('Output:' + (output ? '\n' + output + '\n' : ''))
  process.stdout.write('\n')

  stdinInput()
}

const run = InterpreterFactory({ debug: consoleDebug, output: debugOutput, input: debugInput, size: 15 })

run(src).then(() => {})
