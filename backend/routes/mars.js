const express = require('express');
const Joi = require('joi');
const nasa = require('../config/nasaApi');
const router = express.Router();

const schema = Joi.object({ rover: Joi.string().valid('curiosity','opportunity','spirit').default('curiosity'), sol: Joi.number().integer().min(0).default(1000) });
router.get('/', async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.query);
    if (error) { error.status = 400; throw error; }
    const { rover, sol } = value;
    const resp = await nasa.get(`/mars-photos/api/v1/rovers/${rover}/photos`, { params: { sol } });
    res.json(resp.data);
  } catch(err){next(err);}  
});
module.exports = router;