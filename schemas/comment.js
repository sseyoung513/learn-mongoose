const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User', // commenter 필드에 User(사용자) 스키마의 ObjectId(===_id)가 들어간다는 뜻, 몽구스가 JOIN과 비슷한 기능할 때 사용됨
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// mongoose.model
// - 1번째 인수 : 이 인수로 컬렉션 이름 생성
//   = Comment라면 comments라는 컬렉션 생성
//     : 강제 개명이 싫은 경우 3번째 인수로 컬렉션 이름 지정 가능
//        ( mongoose.model('User', userSchema, 'user_table) )

module.exports = mongoose.model('Comment', commentSchema);
