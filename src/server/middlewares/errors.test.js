const { errorNotFound } = require("./errors");

describe("Given a midleware error not found", () => {
  describe("When it's called with a request and a response", () => {
    test("Then it should return a code status 404", () => {
      const expectedStatus = 404;
      const expectedJSON = { error: true, message: "Not found" };
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const req = {};
      const res = { status: mockStatus, json: mockJson };

      errorNotFound(req, res);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalledWith(expectedJSON);
    });
  });
});
