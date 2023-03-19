import {MathOperands} from "../enum.js";

class Calculator {
    #operations

    /**
     * Calculator constructor
     *
     * @param executor {MathExecutor}
     */
    constructor(executor) {

        this.#operations = {
            [MathOperands.PLUS]: { priority: 1, exec: executor.addition },
            [MathOperands.MINUS]: { priority: 1, exec: executor.condition },
            [MathOperands.MULTIPLY]: { priority: 2, exec: executor.multiplication },
            [MathOperands.DIVIDE]: { priority: 2, exec: executor.division },
        }
    }

    /**
     * Execute math result
     *
     * @param stack {string[]}
     * @returns {number}
     */
    exec(stack) {
        if (Calculator._isMathOperand(stack[0])) stack.unshift('0')
        const notation = this.#toPolishNotation(stack)
        return this.#resolvePolishNotation(notation)
    }

    /**
     * Parse memory stack to polish notation
     *
     * @param stack {string[]}
     * @return {string[]}
     */
    #toPolishNotation(externalStack) {
        let output = []
        const stack = []

        externalStack.forEach((val) => {
            if (Calculator._isMathOperand(val)) {
                const lastInStack = stack[stack.length - 1]
                if(stack.length === 0) return stack.push(val)

                if (this.#operations[lastInStack].priority < this.#operations[val].priority) {
                    stack.push(val)
                } else {
                    stack.slice().reverse().forEach((i) => {
                        if (this.#operations[i].priority >= this.#operations[val].priority) {
                            output.push(stack.pop())
                        }
                    })
                    stack.push(val)
                }
            } else output.push(val)
        })

        output = [...output, ...stack.reverse()]
        return output
    }

    /**
     * Get result from polish notation
     *
     * @param notation {string[]}
     * @return {number}
     */
    #resolvePolishNotation(notation) {
        const stack = []

        notation.forEach((token) => {
            if (Calculator._isMathOperand(token)) {
                let [y, x] = [stack.pop(), stack.pop()];
                stack.push(this.#operations[token].exec(x, y));
            } else {
                stack.push(parseFloat(token))
            }
        })

        return stack.pop()
    }

    /**
     * Value is Math Operand?
     *
     * @param operand {string}
     * @private
     */
    static _isMathOperand(operand) {
        return [
            MathOperands.PLUS,
            MathOperands.MINUS,
            MathOperands.MULTIPLY,
            MathOperands.DIVIDE,
        ].includes(operand)
    }

}

export { Calculator }
