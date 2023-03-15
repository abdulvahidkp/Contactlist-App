const users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { response } = require('express');
require('dotenv/config')

module.exports = {
    postSignup: async (req, res) => {
        let { username, email, password } = req.body;
        users.findOne({ email }).then(async response => {
            if (response) return res.status(409).json({ message: 'email already exist' });
            password = await bcrypt.hash(password, 10)
            users.create({ username, email, password }).then(response => {
                const accessToken = jwt.sign({
                    id: response._id
                }, process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );
                console.log(accessToken);
                res.status(201).json({ message: 'user created succesfully', username: response.username, email: response.email, accessToken });
            }).catch(err => {
                console.log(err.message)
                res.status(400).json({ message: err.message })
            })
        })
    },
    postSignin: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'mobile number and password required.' });
        try {
            const foundUser = await users.findOne({ email })
            if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
                const accessToken = jwt.sign({ id: foundUser._id, }, process.env.JWT_SECRET, { expiresIn: '7d' });
                res.status(200).json({username:foundUser.username , email: foundUser.email, accessToken});
            } else {
                res.status(401).json({ message: 'invalid mobile or password' }) // unauthorized
            }
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ message: 'error occured', err: error.message })
        }
    },
}