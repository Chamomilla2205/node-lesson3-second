const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const dataPath = path.join(process.cwd(), 'dataBase', 'database.json');

module.exports = {
    findAllUsers: async (query) => {
        const data = await readFilePromise(dataPath);
        const {username, email} = query;

        let users = JSON.parse(data);

        if (username) {
            users = users.filter(user => user.name.toLowerCase() === username.toLowerCase());
        }

        if (email) {
            users = users.filter(user => user.email.toLowerCase() === email.toLowerCase());
        }

        return users;
    },


    findUserById: async (userId) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        return users.find(user => user.id === +userId);

    },

    createUser: async (userObject) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        users.sort((a, b) => a.id - b.id);
        userObject.id = users[users.length - 1].id + 1;

        users.push(userObject);

        await writeFilePromise(dataPath, JSON.stringify(users));
    },

    deleteUserById: async (userId) => {
        const data = await readFilePromise(dataPath);

        const users = JSON.parse(data);

        const newArrayOfUsers = users.filter(user => user.id !== +userId);

        await writeFilePromise(dataPath, JSON.stringify(newArrayOfUsers));
    }
}




