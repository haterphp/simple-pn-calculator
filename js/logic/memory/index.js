import {FLOAT_DELIMITER, MathOperands} from "../enum.js";

class Memory {
    #stack

    constructor() {
        this.#stack = ['0']
    }

    get numbers() {
        return this.#stack.filter((item) => !isNaN(+item))
    }

    get stack() {
        return this.#stack
    }

    get lastStackElement() {
        return this.#stack[this.#stack.length - 1]
    }

    /**
     * Check state to include to digit or operand and then push
     *
     * @param state {string}
     */
    push(state) {
        if (Memory._isOperand(state)) {
            switch (state) {

                case MathOperands.CLEAR:
                    if (Memory._isOperand(this.lastStackElement)) this.#stack.pop()
                    else if (!isNaN(this.lastStackElement)) {
                        const newElement = this.lastStackElement
                            .split('')
                            .slice(0, -1)
                        if (newElement.length !== 0) {
                            this.#stack[this.#stack.length - 1] = newElement.join('')
                        } else this.#stack.pop()
                    }

                    if (this.#stack.length === 0) this.#stack = ['0']
                    break

                case MathOperands.CLEAR_ALL:
                    this.#stack = ['0']
                    break

                case MathOperands.EQUAL:
                    break
                default:
                    if (Memory._isOperand(this.lastStackElement)) {
                      this.#stack[this.#stack.length - 1] = state
                    } else this.#stack.push(state)
                    break
            }
        }

        if (Memory._isDigit(+state) || state === FLOAT_DELIMITER) {
            if (this.numbers.length === 0 || Memory._isOperand(this.lastStackElement)) {
                this.#stack.push(state)
            } else {
                const lastNumber = this.numbers[this.numbers.length - 1]
                if (+lastNumber === 0 && +state === 0) return

                const idx = this.#stack.indexOf(lastNumber, this.#stack.length - 1);

                if (idx !== -1) {
                    this.#stack = [
                        ...this.#stack.slice(0, idx),
                        `${+lastNumber === 0 ? '' : lastNumber}${state}`,
                        ...this.#stack.slice(idx + 1)
                    ]
                }
            }
        }
    }

    /**
     * Function to clear memory
     */
    clearStack() {
        this.#stack = []
    }

    /**
     * Check value is math operand or not
     *
     * @param operand {string}
     * @returns {boolean}
     * @private
     */
    static _isOperand(operand) {
        return Object.values(MathOperands).includes(operand)
    }

    /**
     * Check value is math digit or not
     *
     * @param digit {number}
     * @returns {boolean}
     * @private
     */
    static _isDigit(digit) {
        return Array.from({length: 10}, (_, i) => i)
            .includes(digit)
    }
}

export {Memory}
