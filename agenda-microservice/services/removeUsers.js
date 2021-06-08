const query = require('./db');

async function removeUsers(idAgenda, idUser) {
    console.log('Call of removeUser : ', idUser, 'on agenda : ', idAgenda);
    const result = await query(`DELETE FROM agendaUsers WHERE id_agenda=? AND id_user=?`,
        [
            idAgenda,idUser 
        ]);

    if (result.affectedRows) {
        return {
            status: 'ok',
            data: {
                message: "Deletion validated "
            }
        };
    } else {
        return {
            status: 'error',
            data: {
                reason: "Error in deleting user to agenda"
            }
        };
    }
}

module.exports = removeUsers ;