const express = require('express');
const app = express();
const port = 3000;

// 정적 파일을 서빙할 디렉토리 설정
app.use(express.static('public')); // 'public' 폴더에 있는 파일들을 제공

// 기본 경로에 대한 응답 처리
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // index.html을 기본 페이지로 설정
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
