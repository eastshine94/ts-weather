describe('throw test', () => {
  it('error가 발생합니다.', () => {
    expect(() => {
      throw new Error('error 발생');
    }).toThrow();
  });
});
