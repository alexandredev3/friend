const sequelize = require('sequelize');

// const connection = new sequelize('amigo','root','docker', {
//     host: '172.17.0.2',
//     dialect: 'mysql'
// });

const connection = new sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

module.exports =  connection;