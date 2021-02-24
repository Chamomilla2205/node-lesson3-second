const errorCodes = require('../constants/error.codes')
const errorMessages = require('../error/error.messages')
module.exports = {
    checkValidId: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (userId < 0 || Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.INVALID_ID);
            }

            next();

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    },

    areUserDataOk: (req, res, next) => {
        try {
            const {name, email, password, preferLanguage = 'en'} = req.body;

            if (!email || !password || !name) {
                throw new Error(errorMessages.REGISTRATION_TROUBLE[preferLanguage]);
            }

            if (password.length < 4) {
                throw new Error(errorMessages.TOO_WEAK_PASSWORD[preferLanguage]);
            }

            next();

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    }
}
