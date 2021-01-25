const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      // 정의한 스키마에 부합하지 않는 데이터 삽입 시, 몽구스가 에러 발생시킴
      // _id는 자동으로 생성됨
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    // 댓글 쓴 사용자의 아이디로 댓글 조회 후,
    // populate 메서드로 관련있는 컬렉션의 다큐먼트 불러옴
    // Comment 스키마 Commenter 필드의 ref가 User로 되어 있으므로, 알아서 users 컬렉션에서 사용자 다큐먼트를 찾아 합침
    // -> ObjectId였던 commenter가 그 ObjectId를 가진 User(사용자) 다큐먼트로 치환됨
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      'commenter'
    );
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
