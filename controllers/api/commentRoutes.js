const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// api/comments works
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// api/comments/:id works
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// works
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
// works
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        post_id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// works
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
