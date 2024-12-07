require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require('./routes/bookingRoutes');
// Models
const User = require('./models/user');
const Train = require('./models/train');
const Booking = require('./models/booking');

// Associations
User.hasMany(Booking);
Train.hasMany(Booking);
Booking.belongsTo(User);
Booking.belongsTo(Train);

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes );
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// Database connection and server start
(async () => {
   try {
     await sequelize.sync({ force: false });
     console.log('Database connected');
     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });
   } catch (err) {
     console.error('Database connection error:', err);
   }
})();