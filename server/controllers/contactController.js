const users = require('../models/user.model');

module.exports = {

    getContacts: async (req, res) => {
        const _id = req._id
        users.findOne({ _id }).then(response => {
            res.status(200).json(response?.contact)
        }).catch((err) => console.log(err.message))
    },

    addContact: async (req, res) => {
        const _id = req._id
        const { name, email, number } = req.body
        users.findOne({ _id, "contact.number": number }).then(async (response) => {
            if (response) {
                return res.status(400).json({
                    message: "This number is already in use"
                })
            }
            await users.updateOne({ _id }, { $push: { contact: { name, email, number } } }, { upsert: true }).then(response => {
                res.status(200).json({
                    message: "Contact added successfully"
                })
            }).catch(err => console.log(err))
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    editContact: async (req, res) => {
        console.log(req.body)
        const _id = req._id
        const oldNum = req.body.oldNum
        const name = req.body.editName
        const email = req.body.editEmail
        const number = req.body.editNum
        if(oldNum !== number){
            let numberExist = await users.findOne({ _id, 'contact.number': number })
            if (numberExist) return res.status(400).json({ message: "This number is already in use" })
        }
        console.log(oldNum);
        console.log(name)
        console.log(email)
        console.log(number)
        console.log(_id)
        users.updateOne(
            { _id, 'contact.number': oldNum },
            { $set: { 'contact.$.number': number ,'contact.$.name':name,'contact.$.email':email} }
        ).then(async (response) => {
            console.log(response);
            res.status(200).json({ message: 'success' })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    deleteContact: async (req, res) => {
        const _id = req._id
        const { number } = req.query
        users.updateOne({_id},{ $pull: { contact: { number } } }
        ).then(response => {
            res.status(200).json({ message: 'success' })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    }
}