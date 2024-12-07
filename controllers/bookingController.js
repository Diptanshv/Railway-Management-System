const { Op } = require('sequelize');
const Train = require('../models/train');
const Booking = require('../models/booking');
const sequelize = require('../config/database');

exports.bookSeat = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { trainId } = req.body;
    const userId = req.user.id;
    
    // Check if user has already booked this train
    const existingBooking = await Booking.findOne({
      where: { 
        UserId: userId, 
        TrainId: trainId 
      }
    });

    if (existingBooking) {
      await transaction.rollback();
      return res.status(400).json({ 
        error: 'You have already booked a seat on this train' 
      });
    }
    
    // Find train with row lock
    const train = await Train.findByPk(trainId, { 
      lock: true,
      transaction 
    });
    
    if (!train) {
      await transaction.rollback();
      return res.status(404).json({ 
        error: 'Train not found' 
      });
    }
    
    // Check seat availability
    if (train.availableSeats <= 0) {
      await transaction.rollback();
      return res.status(400).json({ 
        error: 'No seats available' 
      });
    }
    
    // Decrement available seats
    train.availableSeats -= 1;
    await train.save({ transaction });
    
    // Create booking
    const booking = await Booking.create({
      UserId: userId,
      TrainId: trainId
    }, { transaction });
    
    // Commit transaction
    await transaction.commit();
    
    res.status(201).json({ 
      message: 'Seat booked successfully', 
      booking 
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      error: 'Booking failed', 
      details: error.message 
    });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { UserId: req.user.id },
      include: [Train]
    });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ 
      error: 'Could not fetch bookings', 
      details: error.message 
    });
  }
};