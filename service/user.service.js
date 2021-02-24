const path = require('path')
const fs = require('fs')
const {promisify} = require('util')

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const dataPath = path.join(process.cwd(), 'dataBase', 'database.json')

module.exports = {
    findAllUsers: async () => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        return users;
    },


    findUserById: async (userId) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        const foundUser = users.find(user => user.id === +userId)

        return foundUser;
    },
    findUserNameById: async (userName) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        const foundUser = users.find(user => user.name.toLowerCase() === userName.toLowerCase())

        return foundUser;
    },

    createUser: async (userObject) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        users.sort((a, b) => a.id - b.id)
        userObject.id = users[users.length - 1].id + 1;

        users.push(userObject)

        await writeFilePromise(dataPath, JSON.stringify(users))
    },

    deleteUserById: async (userId) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        const newArrayOfUsers = users.filter(user => user.id !== +userId)

        await writeFilePromise(dataPath, JSON.stringify(newArrayOfUsers))
    }
}




