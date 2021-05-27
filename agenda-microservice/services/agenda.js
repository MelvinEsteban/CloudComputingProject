const query = require('./db');

async function add(name, idUser) {
    const result = await query(
        `INSERT INTO agenda (name, id_user)
        VALUES  (?,?)`,
        [
            name, idUser
        ]
    );

    let message = 'Error in creating agenda';

    if (result.affectedRows) {
        message = 'Agenda created successfully';
    }
    return {
        message
    };
}

async function getByName(name) {
    const result = await query(
        `SELECT * FROM agenda WHERE name=?`,
        [
            name
        ]
    );

    let message = 'Error no agenda named ' + name;
    let data = [];
    if (result.length > 0) {
        data = result;
        message = 'GET SUCCESS';
    }

    return {
        message,
        data
    };
}

async function getByUser(idUser) {
    const result = await query(
        `SELECT * FROM agenda WHERE id_user=?`,
        [
            idUser
        ]
    );

    let message = 'Error no Agenda assigned to the user : ' + idUser;
    let data = [];
    if (result.length > 0) {
        data = result;
        message = 'GET SUCCESS';
    }

    return {
        message,
        data
    };

}




async function remove(id) {
    const result = await query(
        `DELETE FROM agenda WHERE id_agenda=?`,
        [id]
    );

    let message = 'Error in deleting agenda';

    if (result.affectedRows) {
        message = 'Agenda deleted successfully';
    }

    return {
        message
    };
}


async function update(idAgenda, name, idUser) {
    const result = await query(
        `UPDATE agenda 
            SET name=?, id_user=?
            WHERE id_agenda=?`,
        [
            name, idUser, idAgenda
        ]
    );

    let message = 'Error in updating agenda';

    if (result.affectedRows) {
        message = 'Agenda updated successfully';
    }

    return {
        message
    };
}

module.exports = {
    ...module.exports,
    getByUser,
    getByName,
    add,
    remove,
    update
}