const express = require('express');
const {createTrain, getTrainsByRoute} = require('../controllers/trainController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/', 
  authMiddleware, 
  adminMiddleware, 
  createTrain
);

router.get('/search', 
  authMiddleware, 
  getTrainsByRoute
);

module.exports = router;