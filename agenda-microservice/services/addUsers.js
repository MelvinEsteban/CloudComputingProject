const query = require('./db');

async function addUsers(idAgenda, idUser) {
    console.log('Call of addUser : ', idUser, 'on agenda : ', idAgenda);
    const result = await query(
        `INSERT INTO agendaUsers (id_user, id_agenda)
        VALUES  (?,?)`,
        [
            idUser, idAgenda
        ]
    );

    if (result.affectedRows) {
        return {
            status: 'ok',
            data: { id_agenda : idAgenda }
        };
    } else {
        return {
            status: 'error',
            data: {
                reason: "Error in adding users to agenda"
            }
        };
    }
}

module.exports = addUsers;