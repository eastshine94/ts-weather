## git clone 시 주의사항

root 폴더에 **.env**, **.env.production**이라는 파일들을 만들고 아래와 같은 값을 가져야합니다.
그래야 npm start로 실행할 때, api를 호출할 수 있습니다.

```
REACT_APP_API_KEY = https://openweathermap.org/ 에서 받은 key 값
```