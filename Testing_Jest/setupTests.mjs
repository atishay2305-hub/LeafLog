import '@testing-library/jest-dom';

beforeAll(() => {
  jest.spyOn(window, 'fetch').mockResolvedValue({
    json: () => Promise.resolve({ data: 'mocked data' }),
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
