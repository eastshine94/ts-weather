const arr = ['서울', '대구', '대전', '부산', '광주'];

describe('array test', () => {
  it('arr length is 4', () => {
    expect(arr).toHaveLength(5);
  });

  it('arr에 서울이 있나요?', () => {
    expect(arr).toContain('서울');
  });

  it('arr에 제주가 있나요?', () => {
    expect(arr).not.toContain('제주');
  });
});
