import defaultInput from "./input.js"
import defaultOutput from "./output.js"

const defaultSize = 30000
const SKIP_STEP = -1

const InterpreterFactory = (options = {}) => {
  const {
    input = defaultInput,
    output = defaultOutput,
    size = defaultSize,
    debug = () => {}
  } = options

  return async (src) => {
    const cells = new Int8Array(size)
    const stack = []
    let i = 0

    for (let j = 0; j < src.length; j++)
    {
      await debug({ cells, i, stack, character: j })

      if (src[j] === '[' && cells[i] !== 0) stack.push(j)
      if (src[j] === '[' && cells[i] === 0) stack.push(SKIP_STEP)
      if (src[j] === ']' && cells[i] === 0) stack.pop()
      if (src[j] === ']' && cells[i] !== 0) j = stack[stack.length - 1]

      if (stack.includes(SKIP_STEP)) continue

      if (src[j] === '>') i++;
      if (src[j] === '<') i--;
      if (src[j] === '+') cells[i]++
      if (src[j] === '-') cells[i]--
      if (src[j] === '.') output(cells[i])
      if (src[j] === ',') cells[i] = input()
    }
  }
}

export { InterpreterFactory }

export default InterpreterFactory()
