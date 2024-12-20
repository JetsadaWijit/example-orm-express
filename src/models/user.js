const fs = require('fs');
const path = require('path');

// Path to the users.json file
const USERS_FILE_PATH = path.join(__dirname, '../data/users.json');

// Helper function to read user data from JSON file
function readUsersFromFile() {
    try {
        const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write user data to JSON file
function writeUsersToFile(users) {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 4));
}

class User {
    /**
     * Create a new user and store in the "database"
     * @param {string} username 
     * @param {string} password 
     */
    static async createUser(username, password) {
        const users = readUsersFromFile();
        const newUser = { username, password };
        users.push(newUser);
        writeUsersToFile(users);
        return newUser;
    }

    /**
     * Find a user by username and password
     * @param {string} username 
     * @param {string} password 
     * @returns {object|null} The found user or null
     */
    static async findUser(username, password) {
        const users = readUsersFromFile();
        return users.find(user => user.username === username && user.password === password) || null;
    }

    /**
     * Find a user by username only
     * @param {string} username 
     * @returns {object|null} The found user or null
     */
    static async findUserByUsername(username) {
        const users = readUsersFromFile();
        return users.find(user => user.username === username) || null;
    }
}

module.exports = User;
