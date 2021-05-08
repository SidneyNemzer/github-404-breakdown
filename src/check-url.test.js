const { UnexpectedStatus, testPath, testPaths } = require("./check-url");

describe("testPath", () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  it("returns true for valid paths", async () => {
    mockFetch.mockReturnValue(Promise.resolve({ ok: true }));

    expect(await testPath("a", [], true)).toBe(true);
    expect(mockFetch).lastCalledWith("/a");

    expect(await testPath("b", ["a"], true)).toBe(true);
    expect(mockFetch).lastCalledWith("/a/b");

    expect(await testPath("c", ["a", "b"], true)).toBe(true);
    expect(mockFetch).lastCalledWith("/a/b/c");
  });

  it("returns false for paths that 404", async () => {
    mockFetch.mockReturnValue(Promise.resolve({ ok: false, status: 404 }));

    expect(await testPath("a", [], true)).toBe(false);
    expect(mockFetch).lastCalledWith("/a");
  });

  it("returns false for the last segment", async () => {
    mockFetch.mockReset();

    expect(await testPath("a", [], false)).toBe(false);
    expect(mockFetch.mock.calls.length).toBe(0);
  });

  it("returns true when third segment is tree or blob", async () => {
    mockFetch.mockReset();

    expect(await testPath("tree", ["a", "b"], true)).toBe(true);
    expect(await testPath("blob", ["a", "b"], true)).toBe(true);
    expect(mockFetch.mock.calls.length).toBe(0);

    mockFetch.mockReturnValue(Promise.resolve({ ok: true }));
    expect(await testPath("blob", [], true)).toBe(true);
    expect(mockFetch).lastCalledWith("/blob");
  });

  it("replaces the third segment with 'tree' when it's 'blob'", async () => {
    mockFetch.mockReturnValue(Promise.resolve({ ok: true }));

    expect(await testPath("c", ["a", "b", "blob"], true)).toBe(true);
    expect(mockFetch).lastCalledWith("/a/b/tree/c");

    expect(await testPath("d", ["a", "b", "c"], true)).toBe(true);
    expect(mockFetch).lastCalledWith("/a/b/c/d");
  });

  it("throws when fetch returns an unexpected status", async () => {
    const res = { ok: false, status: 500 };
    mockFetch.mockReturnValue(Promise.resolve(res));

    expect(testPath("a", [], true)).rejects.toEqual(new UnexpectedStatus(res));
    expect(mockFetch).lastCalledWith("/a");
  });
});

describe("testPaths", () => {
  it("works with the bad segment at the end", async () => {
    expect.assertions(8);

    let order = [
      [0, true, "a"],
      [2, true, "c"],
      [4, true, "e"],
      [5, false, "f"],
    ];

    const update = (index, status) => {
      const [[expectedIndex, expectedStatus], ...rest] = order;
      order = rest;
      expect(index).toBe(expectedIndex);
      expect(status).toBe(expectedStatus);
    };

    const testPathMock = async (segment, segments, hasNextSegment) => {
      return order[0][1];
    };

    return testPaths("/a/b/c/d/e/f", update, testPathMock);
  });

  it("works with the bad segment at the start", async () => {
    expect.assertions(2);

    let order = [[0, false, "a"]];

    const update = (index, status) => {
      const [[expectedIndex, expectedStatus], ...rest] = order;
      order = rest;
      expect(index).toBe(expectedIndex);
      expect(status).toBe(expectedStatus);
    };

    const testPathMock = async (segment, segments, hasNextSegment) => {
      return order[0][1];
    };

    return testPaths("/a/b/c/d/e/f", update, testPathMock);
  });

  it("works with the bad segment in the middle (rounded down)", async () => {
    expect.assertions(4);

    let updateOrder = [
      [0, true, "a"],
      [2, false, "c"],
    ];
    let testPathOrder = [true, false, true];

    const update = (index, status) => {
      const [[expectedIndex, expectedStatus], ...rest] = updateOrder;
      updateOrder = rest;
      expect(index).toBe(expectedIndex);
      expect(status).toBe(expectedStatus);
    };

    const testPathMock = async (segment, segments, hasNextSegment) => {
      // console.log(order[0], segment);
      const status = testPathOrder[0];
      testPathOrder = testPathOrder.slice(1);
      return status;
    };

    return testPaths("/a/b/c/d/e/f", update, testPathMock);
  });

  it("works with the bad segment in the middle (rounded up)", async () => {
    expect.assertions(6);

    let updateOrder = [
      [0, true, "a"],
      [2, true, "c"],
      [3, false, "d"],
    ];
    let testPathOrder = [true, true, false];

    const update = (index, status) => {
      const [[expectedIndex, expectedStatus], ...rest] = updateOrder;
      updateOrder = rest;
      expect(index).toBe(expectedIndex);
      expect(status).toBe(expectedStatus);
    };

    const testPathMock = async (segment, segments, hasNextSegment) => {
      // console.log(order[0], segment);
      const status = testPathOrder[0];
      testPathOrder = testPathOrder.slice(1);
      return status;
    };

    return testPaths("/a/b/c/d/e/f", update, testPathMock);
  });
});
