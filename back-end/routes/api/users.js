const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('../../model/User');

// @route   post api/users
// @desc    Test Route
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter whit 6 or more character').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({
          error: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
          user:{
              id:user.id
          }
      }

      jwt.sign(payload, config.get('jwtrahasia'),{expiresIn: 36000},(err, token)=>{
        if(err) throw err;
        res.json({token: token})
      })
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  }
);

module.exports = router;
