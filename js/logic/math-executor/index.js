class MathExecutor {

    /**
     * Addition math operation
     *
     * @param a {number}
     * @param b {number}
     * @returns {number}
     */
    addition(a, b) {
        return a + b
    }

    /**
     * Condition math operation
     *
     * @param a {number}
     * @param b {number}
     * @returns {number}
     */
    condition(a, b) {
        return a - b
    }

    /**
     * Multiplication math operation
     *
     * @param a {number}
     * @param b {number}
     * @returns {number}
     */
    multiplication(a, b) {
        return a * b
    }

    /**
     * Division math operation
     *
     * @param a {number}
     * @param b {number}
     * @returns {number}
     */
    division(a, b) {
        if (b === 0) {
            throw new Error('Division by zero is not allowed')
        }
        return a / b
    }
}

export { MathExecutor }
