const mongoose = require('mongoose');

// 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용 확인 가능케 함
const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  // 몽구스와 몽고디비를 연결
  // 몽고디비 주소로 접속 시도
  mongoose.connect(
    'mongodb://root:1234@localhost:27017/admin', //접속 시도 주소의 DB는 admin이나,
    {
      dbName: 'nodejs', // 실제 사용할 DB는 nodejs이므로 두번째 인수로 dbName 옵션을 줘서 nodejs DB 사용케 함
      useNewUrlParser: true, // 미입력 시 콘솔에 경고 메시지 뜸
      useCreateIndex: true, // 미입력 시 콘솔에 경고 메시지 뜸
    },
    // 연결 여부 확인 콜백
    (error) => {
      if (error) {
        console.log('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    }
  );
};

// 몽구스 커넥션에 이벤트 리스너 통해
// 에러 발생 시 에러 내용 기록
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
// 연결 종료 시 재연결 시도
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결 끊김. 연결 재시도합니다.');
  connect();
});

module.exports = connect;
