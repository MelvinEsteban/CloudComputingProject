const query = require('./db');

async function add(name, idUser) {
    const result = await query(
        `INSERT INTO agenda (name, id_user)
        VALUES  (?,?)`,
        [
            name, idUser
        ]
    );

    if (result.affectedRows){
        return { status:'ok', data : { id : result.insertId}};
    }
    else {
        return { status: 'error', data : { reason : "Error in creating agenda"}} ;
    }
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
    console.log('Selection of agenda in the DB of user', idUser);
    const result = await query(
        `SELECT * FROM agenda WHERE id_user=?`,
        [
            idUser
        ]
    );

    return { status :'ok', data : result}
}




async function remove(id) {
    const result = await query(
        `DELETE FROM agenda WHERE id_agenda=?`,
        [id]
    );
    
    if (result.affectedRows){
        return { status:'ok', data : { message : "Agenda deleted successfully"}};
    }
    else {
        return { status: 'error', data : { reason : "Error in deleting agenda"}} ;
    }
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
    
    if (result.affectedRows){
        return { status:'ok', data : { message : "Agenda updated successfully"}};
    }
    else {
        return { status: 'error', data : { reason : "Error in updating agenda"}} ;
    }
}

module.exports = {
    ...module.exports,
    getByUser,
    getByName,
    add,
    remove,
    update
}