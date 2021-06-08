const query = require('./db');

async function getUsers(idAgenda) {
    console.log('Call of getUsers on agenda : ', idAgenda);
    const result = await query(
        `SELECT users.id_user, users.login FROM users
        JOIN agendaUsers ON users.id_user = agendaUsers.id_user
        WHERE agendaUsers.id_agenda = ?`,
        [
            idAgenda
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
                reason: "Error in getting user to agenda"
            }
        };
    }
}

module.exports = getUsers;