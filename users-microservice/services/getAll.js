const query = require('./db');

async function getAll() {
    console.log('Call of getAll users: ');
    const result = await query(
        `SELECT users.id_user, users.login FROM users`,
        [
           
        ]
    );

    if (result.length > 0) {
        return {
            status: 'ok',
            data: result
        };
    } else {
        return {
            status: 'error',
            data: {
                reason: "Error in getting users"
            }
        };
    }
}

module.exports = getAll;