const Train = require('../models/train');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

exports.createTrain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { 
      trainNumber, 
      source, 
      destination, 
      totalSeats 
    } = req.body;

    const sourceLower = source.toLowerCase();
    const destinationLower = destination.toLowerCase();

    const train = await Train.create({
      trainNumber,
      sourceLower,
      destinationLower,
      totalSeats,
      availableSeats: totalSeats
    });

    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ 
      error: 'Train creation failed', 
      details: error.message 
    });
  }
};

exports.getTrainsByRoute = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const sourceLower = source.toLowerCase();
    const destinationLower = destination.toLowerCase();

    const trains = await Train.findAll({
      where: {
        sourceLower,
        destinationLower,
        availableSeats: {
          [Op.gt]: 0
        }
      }
    });

    res.json(trains);
  } catch (error) {
    res.status(500).json({ 
      error: 'Train search failed', 
      details: error.message 
    });
  }
};