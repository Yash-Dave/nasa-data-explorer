// routes/apod.js
const express = require('express');
const Joi = require('joi');
const nasa = require('../config/nasaApi');

const router = express.Router();

const querySchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .description('YYYY-MM-DD format')
});

router.get('/', async (req, res, next) => {
  try {
    const { error, value } = querySchema.validate(req.query);
    if (error) {
      error.status = 400;
      throw error;
    }

    const params = { ...(value.date && { date: value.date }) };
    const response = await nasa.get('/planetary/apod', { params });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
