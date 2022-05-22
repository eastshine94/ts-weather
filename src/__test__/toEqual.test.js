const obj1 = {
  name: '홍길동',
  age: 59,
};
const obj2 = {
  name: '홍길동',
  age: 59,
};

describe('toEqual 테스트', () => {
  it('모든 변수가 동일', () => {
    expect(obj1).toEqual(obj2);
  });
  it('주소 참조이므로 다른 값임', () => {
    expect(obj1).not.toBe(obj2);
  });
});
