import { expect } from "chai";
import Mtrx from "mtrx";

describe('Mtrx Operations', () => {
    it('Matrix addition', () => {
        const m = new Mtrx([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
        const n = new Mtrx([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);

        const result = Mtrx.add(m, n);

        const expected = new Mtrx([
            [ 2, 2, 3 ],
            [ 4, 6, 6 ],
            [ 7, 8, 10 ]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });

    it('Matrix scalar multiplication', () => {
        const m = new Mtrx([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

        const result = Mtrx.mul(m, 3);

        const expected = new Mtrx([
            [ 3, 0, 0 ],
            [ 0, 3, 0 ],
            [ 0, 0, 3 ]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });

    it('Matrix multiplication', () => {
        const m = new Mtrx([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        const n = new Mtrx([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);

        const result = Mtrx.mul(m, n);

        const expected = new Mtrx([
            [ 30, 24, 18 ],
            [ 84, 69, 54 ],
            [ 138, 114, 90 ]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });

    it('Matrix division', () => {
        const n = new Mtrx([[4, 6, 8], [10, 12, 14], [16, 18, 20]]);

        const result = Mtrx.div(n, 2);

        const expected = new Mtrx([
            [ 2, 3, 4 ],
            [ 5, 6, 7 ],
            [ 8, 9, 10 ]
        ]);
        expect(Mtrx.equalAll(result, expected)).equal(true);
    });
});
