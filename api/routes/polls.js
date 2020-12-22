const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { Poll } = require('../../models/Poll');
const { Option } = require('../../models/Option');

router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find({}).exec();
    res.json(polls);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findOne({ _id: id }).exec();
    if (poll) res.json(poll);
    else res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.post(
  '/',
  [
    body('question').isString().isLength({ min: 10 }).trim().escape(),
    body('options', 'You need to enter between 2 and 20 options'),
    body('options.*', 'Option is required').not().isEmpty().trim().escape(),
  ],
  async (req, res) => {
    try {
      const { question, options: rawOptions } = req.body;

      const fourHundo = (custErrors) =>
        res.status(400).json({
          errors: errors.array().length ? errors.array() : [...custErrors],
        });

      const errors = validationResult(req);
      if (!errors.isEmpty()) return fourHundo();

      if (rawOptions.length < 2 || rawOptions.length > 20)
        return fourHundo([
          {
            msg: 'Number of options must be greater than 2 and less than 20',
            value: JSON.stringify(rawOptions),
            param: 'options',
            location: 'body',
          },
        ]);

      const existingPoll = await Poll.findOne({ question }).exec();
      if (existingPoll) {
        return fourHundo([
          {
            msg: 'That question already exists. Enter a unique question',
            value: question,
            param: 'question',
            location: 'body',
          },
        ]);
      }

      const options = rawOptions.map((text) => new Option({ text }));

      const poll = new Poll({
        question,
        options,
      });

      await poll.save();
      req.io.emit('new-poll', poll);
      res.status(201).json(poll);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
);

module.exports = router;
