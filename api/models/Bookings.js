const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departDate: { type: Date, required: true },
  pickup: {
    address: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Booking', bookingSchema)
