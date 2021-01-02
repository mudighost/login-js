const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    //check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
    //check passwords match
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
    //check password length
    if (password.length < 8) {
      errors.push({ msg: 'Password must be at least 8 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
        });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
          } else {
      const newUser = new User({
        name,
        email,
        password
      });
      console.log(newUser)
      res.send('hello');
          }
      });
    }
});

module.exports = router;