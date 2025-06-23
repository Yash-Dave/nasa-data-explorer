const express = require('express');
const Joi = require('joi');
const nasa = require('../config/nasaApi');
const router = express.Router();

const schema = Joi.object({ start_date: Joi.string().pattern(/^\\d{4}-\\d{2}-\\d{2}$/).required(), end_date: Joi.string().pattern(/^\\d{4}-\\d{2}-\\d{2}$/).required() });
router.get('/', async (req,res,next)=>{
  try{
    const {error,value}=schema.validate(req.query);
    if(error){error.status=400;throw error;}
    const resp = await nasa.get('/neo/rest/v1/feed', {params: value});
    res.json(resp.data);
  }catch(err){next(err);}  
});
module.exports = router;