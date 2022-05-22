function fetchUser(id) {
  const users = [
    {
      id: 1,
      name: '홍길동',
      age: 29,
    },
    {
      id: 2,
      name: '김영희',
      age: 57,
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((value) => value.id === id);
      resolve(user);
    }, 100);
  });
}

describe('describe', () => {
  it('setTimeout test', (done) => {
    setTimeout(() => {
      const user = {
        id: 1,
        name: '홍길동',
        age: 29,
      };
      expect(user).toEqual({
        id: 1,
        name: '홍길동',
        age: 29,
      });
      done();
    }, 500);
  });

  it('promise test', (done) => {
    void fetchUser(1).then((user) => {
      expect(user).toEqual({
        id: 1,
        name: '홍길동',
        age: 29,
      });
      done();
    });
  });

  it('async await test', async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({
      id: 1,
      name: '홍길동',
      age: 29,
    });
  });
});
