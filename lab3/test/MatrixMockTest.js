import { expect } from "chai";
import sinon from "sinon";
import Matrix from "../src/matrix.js";

describe('Matrix Mock Test', function () {
    let matrixInstance;

    beforeEach(function () {
        matrixInstance = new Matrix(3);
    });

    afterEach(function () {
        sinon.restore();
    });

    it('Create a matrix', function () {
        const getMatrixSpy = sinon.spy(matrixInstance, 'get_matrix');
        matrixInstance.get_matrix(3);

        expect(getMatrixSpy.calledOnce).to.be.true;
        expect(matrixInstance.get_rows()).to.equal(3);
        expect(matrixInstance.get_cols()).to.equal(4);
    });

    it('Multiply add matrix', function () {
        const getRowsStub = sinon.stub(matrixInstance, 'get_rows').returns(3);
        const getColsStub = sinon.stub(matrixInstance, 'get_cols').returns(4);
        matrixInstance.mull_add(1, 2, 2);

        expect(getRowsStub.called).to.be.false;
        expect(getColsStub.calledOnce).to.be.false;
    });

    it('Wrong row exists', function () {
        sinon.stub(matrixInstance, 'matrix').value([
            [0, 0, 0, 5],
            [0, 0, 0, 0],
            [1, 2, 3, 4]
        ]);

        expect(matrixInstance.exists_wrong_row()).to.be.true;
    });

    it('Zero row exists', function () {
        sinon.stub(matrixInstance, 'matrix').value([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 2, 3, 4]
        ]);

        expect(matrixInstance.exists_zero_row()).to.be.true;
    });

    it('Swaps rows with nonzero row', function () {
        sinon.stub(matrixInstance, 'get_rows').returns(3);
        sinon.stub(matrixInstance, 'get_cols').returns(4);
        matrixInstance.matrix = [
            [0, 0, 0, 0],
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ];

        matrixInstance.swap_with_nonzero_row(0);

        expect(matrixInstance.matrix[0]).to.deep.equal([5, 6, 7, 8]);
        expect(matrixInstance.matrix[1]).to.deep.equal([0, 0, 0, 0]);
    });
});
