const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.user_signup = async (req, res, next) => {
  try {
    const users = await User.find({ email: req.body.email })
    if (users.length >= 1) {
      return res.status(409).json({
        message: 'Mail exists'
      })
    }
    const hash = await bcrypt.hash(req.body.password, 10)

    const user = new User({
      email: req.body.email,
      password: hash,
      number: req.body.number,
      name: req.body.name
    })
    await user.save()
    return res.status(201).json({
      status: true,
      message: 'User created Successfully'
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    })
  }
}

exports.user_login = async (req, res, next) => {
  try {
    const users = await User.find({ email: req.body.email })

    if (users.length < 1) {
      return res.status(401).json({
        status: false,
        message: 'Auth failed'
      })
    }
    const result = bcrypt.compare(req.body.password, users[0].password)
    if (result) {
      const token = jwt.sign(
        {
          email: users[0].email,
          name: users[0].name,
          phone: users[0].phone,
          userId: users[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      )
      return res.status(200).json({
        status: true,
        message: 'Auth successful',
        token: token
      })
    }
    return res.status(401).json({
      status: false,
      message: 'Auth failed'
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}
