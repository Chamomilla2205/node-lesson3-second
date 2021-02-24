const service = require('../service/user.service')
const errorCodes = require('../constants/error.codes')
const errorMessage = require('../error/error.messages')

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await service.findAllUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    },

    getSingleUser: async (req, res) => {
        try {
            const {userId} = req.params;

            const user = await service.findUserById(userId);

            res.json(user);
        } catch (e) {

        }
    },

    addNewUser: async (req, res) => {
        await service.createUser(req.body);

        res.status(errorCodes.CREATED).json(errorMessage.USER_CREATED);
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;

        await service.deleteUserById(userId);

        res.json(errorMessage.USER_DELETED);
    }
}
