const conn = require('./db');

const Tag = conn.define('tag', {
    name: {
        type: conn.Sequelize.STRING,
    }
});

module.exports = Tag;
