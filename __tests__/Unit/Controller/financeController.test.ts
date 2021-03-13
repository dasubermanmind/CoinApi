import typeorm = require('typeorm');

jest.mock('typeorm',
    () => ({
        getRepository: jest.fn(),
    }));

describe("Controller", () => {
    // Arrange all global objects
    // controller
    let mockReq;
    let mockRes;

    beforeEach(async () => {});

    describe('FinanceController', () => {
        test('getAll', async () => {
            // Arrange
            typeorm.getRepository = jest.fn().mockReturnValue({
                createQueryBuilder: jest.fn().mockResolvedValue('mockQuery')
            });

           // controller
           // call the function with mock Req & mock res
            // assert
        });
    });
});
