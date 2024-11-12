import Mtrx from "mtrx";

class MatrixOperations {
    static addMatrices(matrixA, matrixB) {
        if (!Mtrx.isMtrx(matrixA) || !Mtrx.isMtrx(matrixB)) {
            throw new TypeError('Both arguments must be instances of Mtrx.');
        }
        return Mtrx.add(matrixA, matrixB);
    }

    static multiply(objA, objB) {
        if (typeof objA === 'number' && Mtrx.isMtrx(objB)) {
            return Mtrx.mul(objA, objB);
        } else if (Mtrx.isMtrx(objA) && (typeof objB === 'number' || Mtrx.isMtrx(objB))) {
            return Mtrx.mul(objA, objB);
        } else {
            throw new TypeError('Invalid inputs: expected a matrix and scalar or two matrices.');
        }
    }

    static divide(objA, objB) {
        if (typeof objA === 'number' && Mtrx.isMtrx(objB)) {
            return Mtrx.div(objA, objB);
        } else if (Mtrx.isMtrx(objA) && (typeof objB === 'number' || Mtrx.isMtrx(objB))) {
            return Mtrx.div(objA, objB);
        } else {
            throw new TypeError('Invalid inputs: expected a matrix and scalar or two matrices.');
        }
    }
}

module.exports = MatrixOperations;
