const Booking = require('../models/Booking')

exports.addBooking = async (req, res, next) => {
  try {
    const booking = new Booking({
      from: req.body.from,
      to: req.body.to,
      departDate: req.body.departDate,
      pickup: req.body.pickup,
      userId: req.userData.userId
    })

    await booking.save()

    return res.status(201).json({
      status: true,
      message: 'Booking Successful'
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    })
  }
}
