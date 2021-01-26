const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    // populate 메소드로 comment 객체에 다른 컬렉션(User) 다큐먼트 불러옴
    // path 옵션 : 어떤 필드를 합칠지 설정
    // 댓글을 쓴 사람(User)를 comment(id)를 통해서 불러와 치환
    const result = await Comment.populate(comment, { path: 'commenter' });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          _id: req.params.id,
        },
        // 몽고디비와 다르게 $set 연산자 사용 X라도 기입한 필드만 변경
        { comment: req.body.comment }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
