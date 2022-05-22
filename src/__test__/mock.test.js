const mockFn = jest.fn();

test('mock test', () => {
  mockFn('a');
  mockFn(['b', 'c']);
  expect(mockFn).toBeCalledWith('a');
  expect(mockFn).toBeCalledWith(['b', 'c']);
});
