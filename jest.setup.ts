import "@testing-library/jest-dom";

const originalConsoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    const message = args
      .map((arg) => (typeof arg === "string" ? arg : ""))
      .join(" ");

    if (
      message.includes("In HTML, %s cannot be a child of <%s>.") &&
      message.includes("<html>") &&
      message.includes("div")
    ) {
      return;
    }

    originalConsoleError(...args);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
