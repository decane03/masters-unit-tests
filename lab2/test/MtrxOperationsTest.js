import { expect } from "chai";
import Mtrx from "mtrx";

describe('Mtrx addition', () => {
    it('Adds two matrices', () => {
        const matrixA = new Mtrx(2, 2, 1); // [[1, 1], [1, 1]]
        const matrixB = new Mtrx(2, 2, 2); // [[2, 2], [2, 2]]
        const result = Mtrx.add(matrixA, matrixB);

        const expected = new Mtrx([
            [3, 3],
            [3, 3]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });

    it('Throws an error because matrices have different shapes', () => {
        const matrixA = new Mtrx(2, 2, 1);
        const matrixB = new Mtrx(3, 3, 2);

        expect(() => Mtrx.add(matrixA, matrixB)).to.throw(TypeError);
    });
});

describe('Mtrx multiplication', () => {
    it('Multiplies a matrix by a scalar', () => {
        const matrixA = new Mtrx(2, 2, 1); // [[1, 1], [1, 1]]
        const scalar = 3;
        const result = Mtrx.mul(matrixA, scalar);

        const expected = new Mtrx([
            [3, 3],
            [3, 3]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });

    it('Throws an error on multiplying incompatible matrices', () => {
        const matrixA = new Mtrx(2, 3, 1); // 2x3 matrix
        const matrixB = new Mtrx(2, 2, 2); // 2x2 matrix

        expect(() => Mtrx.mul(matrixA, matrixB)).to.throw(TypeError);
    });
})

describe('Mtrx division', () => {
    it('Divides a matrix by a scalar', () => {
        const matrixA = new Mtrx(2, 2, 4); // [[4, 4], [4, 4]]
        const scalar = 2;
        const result = Mtrx.div(matrixA, scalar);

        const expected = new Mtrx([
            [2, 2],
            [2, 2]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });

    it('Throws an error on dividing by a non-scalar non-matrix-like object', () => {
        const matrixA = new Mtrx(2, 2, 4);
        const invalidDivisor = "not a number or matrix";

        expect(() => Mtrx.div(matrixA, invalidDivisor)).to.throw(TypeError);
    });

    it('Throws an error on right-dividing by a singular matrix', () => {
        const matrixA = new Mtrx(2, 2, 4);
        const singularMatrix = new Mtrx([[1, 2], [2, 4]]); // singular matrix

        expect(() => Mtrx.div(matrixA, singularMatrix)).to.throw(TypeError);
    });
});
