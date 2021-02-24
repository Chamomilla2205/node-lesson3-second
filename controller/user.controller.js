const service = require('../service/user.service')
const errorCodes = require('../constants/error.codes')
module.exports = {
    getAllUsers: async (req, res) => {
        try {
            let users = await service.findAllUsers()
            const {username, email} = req.query;

            if (username) {
                users = users.filter(user => user.name.toLowerCase() === username.toLowerCase())
            }
            if (email) {
                users = users.filter(user => user.email.toLowerCase() === email.toLowerCase())
            }

            res.json(users)
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }

    },

    getSingleUser: async (req,res) => {
        try {
            const {userId} = req.params;

            const user = await service.findUserById(userId)
            console.log(user)
            res.json(user)
        } catch (e) {

        }
    },

    addNewUser: async (req,res) => {
        await service.createUser(req.body);
        res.status(201).json('User is created')
    },

    deleteUser: async (req,res) => {
        const {userId} = req.params;
        await service.deleteUserById(userId)
        res.json('User deleted')
    }

}
