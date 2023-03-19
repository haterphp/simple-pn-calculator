import {print} from '../utils/print.js'

import {MathOperands} from "./enum.js";

import {Memory} from "./memory/index.js";
import {MathExecutor} from "./math-executor/index.js";
import {Calculator} from "./calculator/index.js";

const main = () => {

    const memory = new Memory()
    const calculator = new Calculator(new MathExecutor())

    print(memory.stack.join(' '))

    return (state) => {
        if (state === MathOperands.EQUAL
            && !Object.values(MathOperands).includes(memory.lastStackElement)) {
            const res = calculator.exec(memory.stack)
            memory.clearStack()
            String(res).split('').forEach((i) => memory.push(i))
        } else {
            memory.push(state)
        }
        print(memory.stack.join(' '))
    }
}

export default main
