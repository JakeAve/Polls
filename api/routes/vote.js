const express = require('express');
const router = express.Router();

const { Poll } = require('../../models/Poll');

router.post('/:pollId/:optionId', async (req, res) => {
  try {
    const { pollId, optionId } = req.params;
    const poll = await Poll.findOne({ _id: pollId }).exec();
    if (!poll) return res.sendStatus(404);
    const option = poll.options.find(({ _id }) => _id.toString() === optionId);
    if (!option) return res.sendStatus(404);
    option.votes++;

    await poll.save();
    req.io.emit('vote', poll);
    res.json(poll);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
