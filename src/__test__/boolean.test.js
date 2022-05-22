describe('boolean test', () => {
  it('0 is false', () => {
    expect(0).toBeFalsy();
  });
  it('empty string is false', () => {
    expect('').toBeFalsy();
  });
  it('false is false', () => {
    expect(false).toBeFalsy();
  });
  it('NaN is false', () => {
    expect(NaN).toBeFalsy();
  });
  it('null is false', () => {
    expect(null).toBeFalsy();
  });
  it('undefined is false', () => {
    expect(undefined).toBeFalsy();
  });
  it('1 is true', () => {
    expect(1).toBeTruthy();
  });

  it('string is true', () => {
    expect('test').toBeTruthy();
  });

  it('{} is true', () => {
    expect({}).toBeTruthy();
  });
});
