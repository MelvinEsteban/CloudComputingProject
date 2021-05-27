const query = require('./db');

async function add(login, hash) {
    const result = await query(
        `INSERT INTO users (login, password_hash)
        VALUES  (?,?)`,
        [
            login, hash
        ]
    );

    let message = 'Error in creating users';

    if (result.affectedRows) {
        message = 'Users created successfully';
    }
    return { message };
}

async function get(login) {
    const result = await query(
        `SELECT * FROM users WHERE login=?`,
        [
            login
        ]
    );

    let message = 'Error No users named ' + login;
    let data = [];
    if (result.length > 0) {
        data = result;
        message = 'GET SUCCESS';
    }

    return { message, data };
}

async function remove(id) {
    const result = await query(
        `DELETE FROM users WHERE id_user=?`,
        [id]
    );

    let message = 'Error in deleting users';

    if (result.affectedRows) {
        message = 'Users deleted successfully';
    }

    return { message };
}


async function update(id, login = null, passwordHash = null) {
    const result = await query(
        `UPDATE users 
            SET login=?, password_hash=?
            WHERE id_user=?`,
        [
            login, passwordHash, id
        ]
    );

    let message = 'Error in updating users';

    if (result.affectedRows) {
        message = 'Users updated successfully';
    }

    return { message };
}

module.exports = {
    ...module.exports,
    get,
    add,
    remove,
    update
}