const users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { response } = require('express');

module.exports = {
    postSignup: async (req, res) => {
        let { username, email, password } = req.body
        users.findOne({ email }).then(async response => {
            if (response) return res.status(409).json({ message: 'email already exist' });
            password = await bcrypt.hash(password, 10)
            users.create({ username, email, password }).then(response => {
                console.log(response)
                res.status(201).json({ message: 'user created succesfully' });
            }).catch(err => {
                console.log(err.message)
                res.status(400).json({ message: err.message })
            })
        })
    }
}